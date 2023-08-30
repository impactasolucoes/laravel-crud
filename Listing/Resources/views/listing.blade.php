<div data-container="loading"></div>
<div class="corpo-listing" id="psListing">

    @include('listing::confirmation-modal')

    <div>
        @if ($actions && !$formToFieldId)
            <div class="row card-header pb-0 justify-content-center justify-content-md-start">
                <div class="col-12 col-md-8 row mb-3 mb-md-0">
                    @foreach ($actions as $action)
                    <div class="col-4 col-md-3">
                        <button
                            type="button"
                            class="btn btn-icon btn-3 {{ $action->getName() == 'destroy' ? 'btn-danger' : 'btn-primary' }} w-100 mb-0 tooltips actionButton"
                            data-name="{{ $action->getName() }}"
                            data-url="{{ $action->getUrl() }}"
                            data-verb="{{ $action->getVerb() }}"
                            data-method="{{ $action->getMethod() }}"
                            title="{{ strip_tags($action->getLabel()) }}"
                            data-confirmation="{{ $action->getConfirmationText() }}"
                            data-bs-toggle="tooltip"
                            data-placement="top"
                        >
                            @if($action->getIcon())
                                <i class="{{ $action->getIcon() }}"></i>
                                <span class="d-none d-md-inline mb-3 mb-md-0">
                                    {{ $action->getLabel() }}
                                </span>
                            @else
                                {!! $action->getLabel() !!}
                            @endif
                        </button>
                    </div>
                    @endforeach
                </div>
        @endif
                <div class="col-12 col-md-4">
                    @include('listing::search')
                </div>
            </div>

    <form id="listingForm" action="" method="POST" style="display:none">
        {{ csrf_field() }}
        <input type="hidden" name="_method" value=""></button>
        <button type="submit"></button>
    </form>
    </div>

    @if($data && $columns)
    <div class="card-body px-0 pt-0 pb-2">
        <div class="table-resposive p-0 overflow-scroll" >
            <table class="table table-striped table-hover align-items-center mb-0" id="listagemTable" data-redir="{{ url()->full() }}">

                {{-- Cabeçalho com as columns --}}
                <thead>
                    <tr>
                    <th scope="col"  @if(!$showCheckbox) style="display:none" @endif >
                        <input type="checkbox" name="checkbox-listing" />
                    </th>
                    @foreach($columns as $column)
                        <th scope="col" class="text-uppercase text-secondary font-weight-bolder opacity-7">
                            {!! $column->getOrderbyLink($currentOrderby, $allowedOrderbyColumns) !!}
                        </th>
                    @endforeach
                    </tr>
                </thead>

                <tbody>
                    {{-- Registros --}}
                    @forelse ($data->items() as $index => $item)
                        <tr @if($formToFieldId)
                            data-search-field="{{ $formToFieldId }}"
                            data-search-value="{{ $item->$formFromFieldId }}"
                            @endif>

                        <td @if(!$showCheckbox) style="display:none" @endif class="ps-4 pe-4">
                            <input type="checkbox" name="item[]" class="listing-checkboxes" value="{{ $item->$primaryKey }}"/>
                        </td>

                        @foreach ($columns as $column)
                        <td>
                            <div class="d-flex px-3 py-1">
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">{!! $column->formatData($item, $index, $data->items()) !!}</h6>
                                </div>
                            </div>
                        </td>
                        @endforeach
                        </tr>
                    @empty
                        <tr class="empty">
                        <td colspan="100%">
                            <div class="d-flex px-3 py-1">
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Nenhum item encontrado</h6>
                                </div>
                            </div>
                        </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @endif

    @include('listing::pagination')
