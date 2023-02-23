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

                    @foreach ($panel->fields as $field)

                    {{  $field->buildRules($form->getRules(), $form->initial) }}


                        <div class="row mb-2">
                            <div class="col-2">
                                @if ($field->required)
                                    <span class="text-danger">*</span>
                                @endif
                            {{ $field->label }}</div>
                            <div class="col-2">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" @if ($field->required)
                                        @checked(true)
                                        @disabled(true)
                                    @endif checked="">
                                </div>
                            </div>
                            <div class="col"><input class="form-control" type="text" name="" value="{{ $field->label }}"></div>
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
                <table class="table">
                    <thead>
                        <tr>
                            <th>Campo</th>
                            <th>Tipos</th>
                            <th>Valores</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($form->initial['eav_attributes'] as $attribute)

                        <tr>
                            <td><input class="form-control" type="text" name="campo[]" value="{{ $attribute['attribute_label'] }}"/> </td>
                            <td>
                                <select name="tipo[]" class="form-select">
                                    <option value="text">Text</option>
                                    <option value="text">Select</option>
                                </select>
                            </td>
                            <td>
                                <textarea name="valores[]" class="form-control"></textarea>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="text-center">
                <button onclick="criarCampos()" class="btn btn-primary" type="button">Adicionar Campos</button>
            </div>

        </div>

    </div>



</div>


<script>
    function criarCampos() {
        $('#camposAdd table tr:last').after(
            '<tr><td><input class="form-control" type="text" name="campo[]"></td><td><select name="tipo[]" class="form-select"><option value="text">Text</option><option value="text">Select</option></select></td><td><textarea name="valores[]" class="form-control"></textarea></td></tr>'
            );
    }
</script>
