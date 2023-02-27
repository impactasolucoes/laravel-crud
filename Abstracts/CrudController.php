<?php

namespace Impactasolucoes\Crud\Abstracts;

use Impactasolucoes\Crud\Exceptions\DestroyFileException;
use Impactasolucoes\Crud\Exceptions\UpdateFlagException;
use Impactasolucoes\Crud\Helpers\Msg;
use Impactasolucoes\Crud\Form\Form;
use Impactasolucoes\Crud\Helpers\Helpers;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Impactasolucoes\Crud\Models\CrudEavConfigs;
use Impactasolucoes\Crud\Models\CrudEavAttributes;
use Impactasolucoes\Crud\Models\CrudEavValues;
use LogicException;
use ReflectionMethod;

abstract class CrudController extends Controller
{
    public $request;
    public $id;
    public $crudName;

    abstract function formulario(array $dados): Form;

    /**
     * Por padrão, o método "show" está desativado (a maioria dos resources não usam)
     *
     * @param integer|string $id
     * @return void
     */
    public function show($id)
    {
        abort(404);
    }

    /**
     * Executa métodos gerais do controlador.
     *
     * @return void
     */
    public function __construct()
    {
        if (!isset($this->id)) {
            throw new LogicException(get_class($this) . ' deve ter a propriedade $id');
        }
        $this->request = request();
    }


    protected function camposPadrao($request)
    {
        $constructor = new ReflectionMethod($this, 'storeItem');
        $parameter = $constructor->getParameters()[0];
        $dependenceClass = (string) $parameter->getType();

        $validacao = new $dependenceClass;

        $camposValidacao = $validacao->rules();

        CrudEavConfigs::where('crud_name', $this->crudName)->delete();
        foreach ($camposValidacao as $campo => $valida) {

            if (!in_array('required', $valida)) {
                $ativo = (int) isset($request->all()['check_' . $campo]);
            } else {
                $ativo = 1;
            }

            $conf = CrudEavConfigs::create(['crud_name' => $this->crudName, 'config_name' => $campo, 'config_value' => json_encode(['label' => $request->all()[$campo], 'ativo' => $ativo])]);
            $conf->save();
        }

    }


    public function camposPersonalizados($request)
    {
        $campos = $request->campos;
        $tipos = $request->tipos;
        $valores = $request->valores;


        CrudEavAttributes::where('crud_name', $this->crudName)->delete();
        if (empty($campos))
            return;

        foreach ($campos as $c => $campo) {
            if (empty($campo))
                continue;

            $att = CrudEavAttributes::create(['crud_name' => $this->crudName, 'attribute_type' => $tipos[$c], 'attribute_label' => $campo, 'attribute_values' => $valores[$c]]);
            $att->save();
        }

    }


    /*
     * Criando um método padrão "store()" para os eventos de salvar dados.
     * Este método chamará o storeItem()
     */
    public function store()
    {
        $funcArgs = func_get_args();
        $request = request();

        // Adicionando customização de campos
        if ($request->customize) {

            // Campos padrão
            $this->camposPadrao($request);
            // Campos personalizados
            $this->camposPersonalizados($request);

            Msg::ok();
            return back();
        }


        // Faz a validação com Reflection do médoto storeItem()
        $constructor = new ReflectionMethod($this, 'storeItem');
        $parameter = $constructor->getParameters()[0];
        $dependenceClass = (string) $parameter->getType();
        $validacao = app($dependenceClass);
        $validacao->setValidator(Validator::make($request->all(), $validacao->rules(), $validacao->messages()));


        // Pegando todos os parametros da rota e juntando com a request
        $params = [ $validacao, ...$funcArgs ];

        //  Executa o storeItem()
        $item = $this->storeItem($validacao);

        // Retorno padrão
        Msg::ok();
        return $this->redirecionar($item->{$this->id});
    }


    public function update()
    {
        $funcArgs = func_get_args();
        $request = request();

        // Faz a validação com Reflection do médoto storeItem()
        $constructor = new ReflectionMethod($this, 'updateItem');
        $parameter = $constructor->getParameters()[0];
        $dependenceClass = (string)$parameter->getType();
        $validacao = app($dependenceClass);
        $validacao->setValidator(Validator::make($request->all(), $validacao->rules(), $validacao->messages()));

        // Pegando todos os parametros da rota e juntando com a request
        $params = [ $validacao, ...$funcArgs ];

        //  Executa o updateItem()
        $item = $this->updateItem(...$params);

        foreach ($request->get('crud_eav_attribute', []) as $attributeId => $value) {
            $eavValueModel = CrudEavValues::firstOrNew(['crud_name' => $this->crudName, 'entity_id' => $id, 'attribute_id' => $attributeId]);
            $eavValueModel->value_text = $value;
            $eavValueModel->save();
        }

        // Retorno padrão
        Msg::ok();
        return $this->redirecionar($item->{$this->id});
    }


    /**
     * Procura se o método do destroy foi implementado no controlador.
     * Se encontrar o método, executa. Senão, volta com erro.
     * @param Request $request
     * @return JsonResponse
     */
    public function destroyFile(Request $request)
    {
        $metodo = "destroy" . Helpers::camelize($request->get('file_delete', '#'));
        if (!method_exists($this, $metodo)) {
            return response()->json(['error' => 'Método não implementado.'], 422);
        }

        $parameters = array_values($request->route()->parameters());

        // Se atualizar sem problemas, retorna com sucesso
        try {
            $this->$metodo($request, ...$parameters);
        } catch (DestroyFileException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Falha ao excluir arquivo'], 422);
        }

        return response()->json(['success' => true], 200);
    }

    /**
     * Procura se o método do flag foi implementado no controlador.
     * Se encontrar o método, executa. Senão, volta com erro.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateflag(Request $request)
    {
        $metodo = "update" . Helpers::camelize($request->post('listingFlagField'));
        if (!method_exists($this, $metodo)) {
            return response()->json(['error' => 'Método não implementado.'], 422);
        }

        $parameters = array_values($request->route()->parameters());

        // Tenta atualizar o flag. Se der false, retorna com erro
        try {
            $this->$metodo($request, ...$parameters);
        } catch (UpdateFlagException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Não foi possível alterar'], 422);
        }

        return response()->json([
            'id' => end($parameters),
            'field' => $request->post('listingFlagField'),
            'flag' => $request->post('newFlag'),
        ]);
    }


    /**
     * Método genérico de destroy do CRUD
     * Ele chamará o destroyItem($request, $item, ...$parameters) no controlador
     *
     * @param Request $request
     * @return void
     */
    public function destroy(Request $request)
    {
        if (!method_exists($this, 'destroyItem')) {
            return abort(404);
        }

        // Parâmetros da rota
        $parameters = array_values($request->route()->parameters());
        $id = end($parameters);

        $ids = $request->has('multiple')
            ? explode(',', $request->get('multiple'))
            : [$id];

        array_pop($parameters);

        foreach ($ids as $item) {
            if (!is_numeric($item)) {
                continue;
            }
            try {
                array_push($parameters, $item);
                $this->destroyItem($request, ...$parameters);
                array_pop($parameters);
            } catch (Exception $e) {
                if ($e->getCode()) {
                    # algum erro na exclusão, fazemos o redir:
                    Msg::danger($e->getMessage());
                    return back();
                }
                abort(422, 'Erro ao excluir item: ' . $item);
            }
        }

        Msg::success("Itens excluídos com sucesso.");
        return back();
    }


    /**
     * Redireciona o usuário de acordo com a ação
     * @param $id
     * @return JsonResponse
     */
    public function redirecionar($id = null)
    {
        try {
            // Tenta criar um link completo para redirecionamento, e enviá-lo de volta para
            // O front-end redirecionar o usuário no client side
            $linkCompleto = $this->criaLinkRedirecionamento($id);
            return response()->json(['url' => $linkCompleto]);
        } catch (\Throwable $e) {

            // Caso ocorra erro envia uma resposta JSON para display da mensagem de erro no client side
            return new JsonResponse(["errors" => "Ops! Ocorreu um erro ao salvar! " . $e->getMessage()], 422);
        }
    }


    /**
     * Cria um link completo para redirecionamento
     * @param string $action
     * @param null $id
     * @return string
     * @throws Exception
     */
    public function criaLinkRedirecionamento($id = null, $action = "auto")
    {
        # Obtém a ação que está presente no formulário
        $action = $this->request->post('action', '');

        # Obtém o nome da rota pela request
        $route = $this->request->post('redirect_' . $action, false);

        switch ($action) {

            # Salvar - Envia o usuário para o ID do crud submitado
            case 'save':
                if (!$id) {
                    throw new Exception("ID not defined");
                }
                $redir = $this->redirecionaEditar($route, $id);
                break;

            # Salvar e Novo - Envia o usuário para a nova rota, mantendo o redir
            case 'save_create':
                $redir = $this->redirecionaNovo($route);
                break;

            # Salvar e pŕoximo - Envia o usuário para o próximo ID no parâmetros 'ids'
            case 'save_next':
                if (!$id) {
                    throw new Exception("ID not defined");
                }
                $redir = $this->redirecionaProximo($id, $route);
                break;

            # Salvar e fechar - Volta para querystring na rota
            # Caso a url não tenha querystring envia o usuário para a route selecionada
            case 'save_close':
                $redir = $this->redirecionaQuerystring($route);
                break;

            # Envia o usuário para a route informada caso não seja as ações acima
            default:
                $redir = $this->redirecionaRoute($route);
                break;
        }
        return $redir;
    }

    /**
     * Salvar e permanecer
     * @param $route
     * @param $id
     * @return string
     */
    public function redirecionaEditar($route, $id)
    {
        # Envia para rota de editar, limpando a querystring
        # Aqui é adicionado um novo ID nos parâmetrosda rota
        $url = route($route, array_merge($this->request->route()->parameters(), [$id]));
        return Helpers::clearUrl($url) . "?" . Helpers::getQueryString($this->request);
    }

    /**
     * Salvar e Novo
     * @param $route
     * @return string
     */
    public function redirecionaNovo($route)
    {
        # Redireciona e novo, aqui neste caso é mantido os "IDS" na querystring
        return $this->redirecionaRoute($route) . "?" . Helpers::getQueryString($this->request, ['ids']);
    }

    /**
     * Salvar e Próximo - Redireciona para o proximo ID
     * @param $id
     * @param $route
     * @return string
     */
    public function redirecionaProximo($id, $route)
    {
        # Pega o parâmetros "IDS" da url atual
        # Ex: ?ids=1,2,3,4,5&redir=/home
        $ids = Helpers::getParameterFromRequest($this->request, 'ids');
        if ($ids === false) {
            # Envia o usuário para o redirecionamento utilizando a querystring
            return $this->redirecionaQuerystring($route);
        }

        # Explode e busca o id atual
        $ids = explode(',', $ids);
        $idIndex = array_search($id, $ids);

        if ($idIndex === false || $idIndex >= count($ids) - 1) {
            # Envia o usuário para o redir presenta na querystring
            return $this->redirecionaQuerystring($route);
        }

        # Muda para o próximo ID
        $nextId = $ids[$idIndex + 1];
        $parameters = $this->request->route()->parameters();
        array_pop($parameters);
        $parameters[] = $nextId;

        # Monta a Nova URL baseada no próximo ID
        $fullUrl = route($route, $parameters);
        return Helpers::clearUrl($fullUrl) . '?' . Helpers::getQueryString($this->request);
    }

    /**
     * Redireciona para o REDIR na querystring
     * @param $route
     * @param string $querystring
     * @return string
     */
    public function redirecionaQuerystring($route, $querystring = 'redir')
    {
        # Busca a querystring
        $redir = Helpers::getParameterFromRequest($this->request, $querystring);
        if ($redir !== false) {
            return $redir;
        }

        # Fallback baso não ache a querystring selecionada
        return $this->redirecionaRoute($route);
    }

    /**
     * Redireciona para o route selecionado, com os parametros
     * @param $route
     * @return string
     */
    public function redirecionaRoute(?string $route)
    {
        if (empty($route)) {
            return '';
        }
        return Helpers::clearUrl(route($route, $this->request->route()->parameters()));
    }
}
