<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProdutoRequest;
use App\Models\Produto;
use Impactasolucoes\Crud\Abstracts\CrudController;
use Impactasolucoes\Crud\Form\Form;
use Impactasolucoes\Crud\Listing\Listing;

class ProdutoController extends CrudController
{
    public $id = 'id';

    public function index()
    {
        $produtos = Produto::with([]);

        $lista = new Listing('id', $produtos);
        $lista->text('title', 'Título');
        $lista->text('description', 'Descrição');
        $lista->text('price', 'Preço');

        return view('padrao-bs5', ['conteudo' => $lista->render()]);
    }

    public function create()
    {
        $form = $this->formulario([]);

        return view('padrao-bs5', ['conteudo' => $form->render()]);
    }

    public function storeItem(ProdutoRequest $request)
    {
        $dados = $request->only(['title', 'description', 'price']);

        $produto = Produto::create([
            'title' => $dados['title'],
            'description' => $dados['description'],
            'price' => $dados['price']
        ]);

        return $produto;
    }

    public function edit(int $idProduto)
    {
        $dados = Produto::findOrFail(['id' => $idProduto])->first()->toArray();
        $form = $this->formulario($dados);

        return view('padrao-bs5', ['conteudo' => $form->render()]);
    }

    public function updateItem(ProdutoRequest $request, $idProduto)
    {
        $dados = $request->only(['title', 'description', 'price']);

        $produto = Produto::where('id', $idProduto)->update([
            'title' => $dados['title'],
            'description' => $dados['description'],
            'price' => $dados['price']
        ]);

        $produto = Produto::findOrFail(['id' => $idProduto])->first();

        return $produto;
    }

    public function destroyItem($request, int $idProduto)
    {
        Produto::where('id', $idProduto)->delete();
    }

    public function formulario(array $dados): Form
    {
        $form = new Form($dados, 'id');
        $form->setRules(new ProdutoRequest());

        $form->text('title', 'Título');
        $form->text('description', 'Descrição');
        $form->text('price', 'Preço');

        return $form;
    }
}
