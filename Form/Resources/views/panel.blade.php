<div class="accordion" id="abas-form-{{ $form->formId }}">
    @foreach ($form->panels as $index => $panel)
        <div class="overflow-visible"
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
            <div class="row card-header pb-0" id="aba-{{ $panel->getPanelId() }}">
                <h4 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse"
                        data-target="#collapse-{{ $panel->getPanelId() }}"
                        aria-controls="collapse-{{ $panel->getPanelId() }}" aria-expanded="false">
                        {{ $panel->title }}
                    </button>
                </h4>
            </div>
            <div id="collapse-{{ $panel->getPanelId() }}" aria-labelledby="aba-{{ $panel->getPanelId() }}"
                data-parent="#abas-form-{{ $form->formId }}" class="collapse show">
                <div class="card-body px-0 pt-0 pb-2">

                    @foreach ($panel->fields as $field)
                        <div class="fieldBlock" data-field-name="{{ $field->id }}"
                            @if (isset($field->options['show_rules'])) data-show-rules='@json($field->options['show_rules'])' @endif>

                            {!! $field->render($form->initial, $form->getRules()) !!}

                        </div>
                    @endforeach

                </div>
            </div>
        </div>
    @endforeach

    @if(isset($form->initial['eav_attributes']) && count($form->initial['eav_attributes']) > 0)
    <div class="card mb-4 border overflow-visible" data-field-name="panel-eav-attributes">
        <div class="card-header">
            Campos Adicionais
        </div>
        <div class="card-body">

            @foreach ($form->initial['eav_attributes'] as $attribute)
                <div class="fieldBlock" data-field-name="{{ $attribute['id'] }}">

                    @if($attribute['attribute_type'] == 'select')
                        @include('form::fields.select', [
                            'id' => "crud_eav_attribute[".$attribute['id']."]",
                            'required' => false,
                            'label' => $attribute['attribute_label'],
                            'selectOptions' => $attribute['options'],
                            'help' => '',
                            'col' => 10,
                            'class' => '',
                            'attrs' => [],
                            'value' => $form->initial['eav_values'][$attribute['id']] ?? ""
                        ])

                    @else
                        @include('form::fields.text', [
                            'id' => "crud_eav_attribute[".$attribute['id']."]",
                            'required' => false,
                            'label' => $attribute['attribute_label'],
                            'help' => '',
                            'col' => 10,
                            'class' => '',
                            'attrs' => [],
                            'value' => $form->initial['eav_values'][$attribute['id']] ?? ""
                        ])
                    @endif
                </div>
            @endforeach

        </div>
    </div>
    @endif
</div>
