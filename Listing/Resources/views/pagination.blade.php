@if ($data && $data->total() > 0)

    <form method="get" />

    {{-- para manter as querystrings ao submeter o form: --}}
    @foreach (request()->except('middleware') as $item => $valor)
        @if (!in_array($item, ['page', 'pp']) && !is_array($valor) && !empty($valor))
            <input type="hidden" name="{{ $item }}" value="{{ $valor }}" />
        @endif
    @endforeach
    @if (request()->has('op') && is_array(request()->get('op')))
        @foreach (request()->get('op') as $item => $valor)
            @if (!empty($valor))
                <input type="hidden" name="op[{{ $item }}]" value="{{ $valor }}" />
            @endif
        @endforeach
    @endif


    <div class="row my-3">

        <div class="col-6">
            <div class="d-flex justify-content-start align-items-center flex-wrap mt-3 text-center">

                <label class="text-start me-2 mb-0 fs-6">Por página:</label>
                <div class="form-group mb-0">
                    <div class="input-group">
                        <input type="number" value="{{ $data->perPage() }}" class="form-control" name="pp"
                            onchange="document.getElementById('paginationPageNumber').value = 1;this.form.submit()"
                            min="1" max="{{ config('listing.defaultPerPageMaximum') ?? $data->total() }}">
                    </div>
                </div>
                <div class="text-end fs-6 ms-2 mb-0">
                    <strong>{{ $data->firstItem() }} - {{ $data->lastItem() }}</strong> de
                    <strong>{{ $data->total() }}</strong>
                    (<strong>{{ $data->lastPage() }}</strong> página{{ $data->lastPage() > 1 ? 's' : '' }})
                </div>

            </div>
        </div>


        <div class="col-6 d-flex justify-content-end">
            <div class="pagination-container d-flex justify-content-center align-items-center flex-wrap mt-3 text-center mb-0">
                <label class="text-center fs-6 me-2 mb-0">Ir para página:</label>

                <ul class="pagination pagination-default mb-0 d-flex align-items-center">
                    <li class="page-item @if ($data->onFirstPage()) disabled @endif">
                        <a @if (!$data->onFirstPage()) href="{{ $data->appends(request()->except('middleware'))->previousPageUrl() }}" @endif
                            class="page-link" aria-disabled="true"><i class="fas fa-chevron-left"></i>
                        </a>
                    </li>

                    <li class="page-item">
                        <div class="form-group mb-0">
                            <div class="input-group">
                                <input id="paginationPageNumber" type="number" class="form-control mx-3" name="page"
                                    onchange="this.form.submit()" value="{{ $data->currentPage() }}" min="1"
                                    max="{{ $data->lastPage() }}" style="width: 5rem !important" />
                            </div>
                        </div>

                    </li>

                    <li class="page-item @if (!$data->hasMorePages()) disabled @endif">
                        <a @if ($data->hasMorePages()) href="{{ $data->appends(request()->except('middleware'))->nextPageUrl() }}" @endif
                            class="page-link"><i class="fas fa-chevron-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </div>
    </form>

@endif
