<div id="abas-form-{{ $form->formId }}">
    @foreach ($form->panels as $index => $panel)
        <div class="card mb-4 border overflow-visible"
            data-field-name="panel-{{ $index }}"
            @foreach ($panel->attrs as $atributo => $valorAtributo)
                @if ( $atributo === 'data-show-rules-panel')
                    data-show-rules-panel='@json($valorAtributo)'
                    style="display: none;"
                @elseif ($atributo == 'show_rules')
                    data-show-rules='@json($valorAtributo)'
                @elseif(gettype($valorAtributo) == 'string')
                    {{ $atributo }}="{{ $valorAtributo }}"
                @endif
            @endforeach
            >
            <div class="card-header" id="aba-{{$panel->getPanelId()}}">
                {{ $panel->title }}
            </div>
            <div
                id="collapse-{{$panel->getPanelId()}}"
                data-parent="#abas-form-{{ $form->formId }}"
                >
                <div class="card-body">

                    @foreach ($panel->fields as $field)

                        {{ dd( $label) }}
                        <div class="row">
                            <div class="col-2">{{ $field->label }}</div>
                            <div class="col-2">teste</div>
                            <div class="col"><input class="form-control" type="text" name=""></div>
                        </div>

                        {{-- <div class="fieldBlock"
                            data-field-name="{{ $field->id }}"
                            @if(isset($field->options['show_rules'])) data-show-rules='@json($field->options['show_rules'])' @endif
                            >




                            {!! $field->render($form->initial, $form->getRules()) !!}

                        </div> --}}
                    @endforeach

                </div>
            </div>
        </div>
    @endforeach


    <div class="card mb-4 border overflow-visible">

        <div class="card-header" id="aba-{{$panel->getPanelId()}}">
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
                        <tr>
                            <td><input class="form-control" type="text" name="campo[]"></td>
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

    function criarCampos(){
        $('#camposAdd table tr:last').after('<tr><td><input class="form-control" type="text" name="campo[]"></td><td><select name="tipo[]" class="form-select"><option value="text">Text</option><option value="text">Select</option></select></td><td><textarea name="valores[]" class="form-control"></textarea></td></tr>');
    }


</script>
