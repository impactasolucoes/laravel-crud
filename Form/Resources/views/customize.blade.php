<div data-container="loading">
</div>
<div data-expect-alert></div>
<form
    enctype='multipart/form-data'
    method="post"
    {{-- não apaga --}}
    data-its-form
    {{-- Actions--}}
    @if($form->formAction)
    action="{{ $form->formAction }}"
    @endif

    id="{{ $form->formId }}"
    class="{{$form->class}}"



    {{-- Autocomplete--}}
    @if($form->autoComplete)
    autocomplete="off"
    data-form-prefix="c-"
    @endif>


    {{ csrf_field() }}
    {{ method_field($form->method) }}

    @if(!empty($form->primaryKeyValue))
        <input type="hidden" name="{{$form->primaryKey}}" value="{{$form->primaryKeyValue}}" data-id>
    @endif

    {{-- {{ dd($form) }} --}}

    {{-- Render template for panels --}}
    <div class="panel-group" id="Abas" role="tablist" aria-multiselectable="true">

        <div id="abas-form-{{ $form->formId }}">
            @foreach ($form->panels as $index => $panel)
                <div class="card mb-4 border overflow-visible" data-field-name="panel-{{ $index }}"
                    @foreach ($panel->attrs as $atributo => $valorAtributo)
                        @if ($atributo === 'data-show-rules-panel')
                            data-show-rules-panel='@json($valorAtributo)'
                            style="display: none;"
                        @elseif ($atributo == 'show_rules')
                            data-show-rules='@json($valorAtributo)'
                        @elseif(gettype($valorAtributo) == 'string')
                            {{ $atributo }}="{{ $valorAtributo }}"
                        @endif @endforeach>
                    <div class="card-header" id="aba-{{ $panel->getPanelId() }}">
                        {{ $panel->title }}
                    </div>
                    <div id="collapse-{{ $panel->getPanelId() }}" data-parent="#abas-form-{{ $form->formId }}">
                        <div class="card-body">

                            @foreach ($panel->fields as $c => $field)




                            {{  $field->buildRules($form->getRules(), $form->initial) }}

                                @if ($field->label == "ID")
                                    @continue
                                @endif

                                <div class="row mb-2">
                                    <div class="col-2">
                                        @if ($field->required)
                                            <span class="text-danger">*</span>
                                        @endif
                                    {{ $field->label }}</div>
                                    <div class="col-2">
                                        <div class="form-check form-switch">
                                            <input name="check_{{ $field->id }}" class="form-check-input" type="checkbox"
                                            @if ($field->required)
                                                @checked(true)
                                                @disabled(true)
                                            @elseif (isset($form->initial['eav_configs'][$c]['ativo']) && empty($form->initial['eav_configs'][$c]['ativo']))
                                                @checked(false)
                                            @else
                                                @checked(true)
                                            @endif

                                            >
                                        </div>
                                    </div>
                                    <div class="col"><input class="form-control" type="text" name="{{ $field->id }}" value="{{ $form->initial['eav_configs'][$c]['label'] ?? $field->label }}"></div>
                                </div>

                            @endforeach

                        </div>
                    </div>
                </div>
            @endforeach


            <div class="card mb-4 border overflow-visible">

                <div class="card-header" id="aba-{{ $panel->getPanelId() }}">
                    Campos Adicionais
                </div>

                <div class="card-body">
                    <div id="camposAdd">
                        <table id="tabelaCampos" class="table">
                            <thead>
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipos</th>
                                    <th>Valores</th>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                @if (!empty($form->initial['eav_attributes']))

                                @foreach ($form->initial['eav_attributes'] as $attribute)

                                <tr>
                                    <td><input class="form-control" type="text" name="campos[]" value="{{ $attribute['attribute_label'] }}"/> </td>
                                    <td>
                                        <select name="tipos[]" class="form-select">
                                            @foreach (['text' => 'Text', 'select' => 'Select'] as $chave => $valor)
                                            <option @if ($chave == $attribute['attribute_type'])
                                                @selected(true)
                                            @endif value="{{ $chave }}">{{ $valor }}</option>
                                            @endforeach
                                        </select>
                                    </td>
                                    <td>
                                        <textarea name="valores[]" class="form-control">{{ $attribute['attribute_values'] }}</textarea>
                                    </td>
                                    <td> <button class="btn" type="button" onclick="eavDelete(this)" >Delete</button></td>
                                </tr>
                                @endforeach
                                @endif
                            </tbody>
                        </table>
                    </div>

                    <div class="text-center">
                        <button onclick="criarCampos()" class="btn btn-primary" type="button">Adicionar Campos</button>
                    </div>

                </div>

            </div>
        </div>


    </div>

    <input type="hidden" name="customize" value="1" />

    {{-- Açoes --}}

    <div class="form-group row">
        <div class="col-sm-offset-2 col-sm-10">
            <button class="btn btn-primary" name="action" value="save" data-action="save">
                Salvar
            </button>
        </div>
    </div>

</form>
<script>
    function criarCampos() {
        $('#camposAdd table tr:last').after(
            '<tr><td><input class="form-control" type="text" name="campos[]"></td><td><select name="tipos[]" class="form-select"><option value="text">Text</option><option value="text">Select</option></select></td><td><textarea name="valores[]" class="form-control"></textarea></td><td><button class="btn" type="button" onclick="eavDelete(this)" >Delete</button></td></tr>'
            );
    }

    function eavDelete(el){
        var element = el.parentNode.parentNode;
        element.remove();
    }
</script>
