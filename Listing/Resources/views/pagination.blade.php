@if($data && $data->total() > 0)

    <form method="get"/>

        {{-- para manter as querystrings ao submeter o form: --}}
        @foreach(request()->except('middleware') as $item => $valor)
            @if(!in_array($item, ['page', 'pp']) && !is_array($valor) && !empty($valor))
                <input type="hidden" name="{{ $item }}" value="{{ $valor }}" />
            @endif
        @endforeach
        @if(request()->has('op') && is_array(request()->get('op')))
            @foreach(request()->get('op') as $item => $valor)
                @if(!empty($valor))
                    <input type="hidden" name="op[{{ $item }}]" value="{{ $valor }}" />
                @endif
            @endforeach
        @endif

        <div class="d-flex justify-content-between">

            <div>

                <label class="col-md-auto col-form-label">Por página:</label>

                <div class="col-auto pl-0 d-inline-block" >
                    <input
                        type="number"
                        value="{{ $data->perPage() }}"
                        class="form-control"
                        name="pp"
                        onchange="document.getElementById('paginationPageNumber').value = 1;this.form.submit()"
                        min="1"
                        max="{{ config('listing.defaultPerPageMaximum') ?? $data->total() }}"
                    >
                </div>

                <div class="col-auto data-listagem d-inline-block" >
                    <strong>{{ $data->firstItem() }} - {{ $data->lastItem() }}</strong> de <strong>{{ $data->total() }}</strong>
                    (<strong>{{ $data->lastPage() }}</strong> página{{ $data->lastPage() > 1 ? 's' : '' }})
                </div>

            </div>

            <div>

                <div class="d-inline-block me-3">
                    <label class="col-md-auto col-form-label">Ir para página:</label>
                </div>

                <div class="d-inline-block">
                    <a @if(! $data->onFirstPage()) href="{{ $data->appends(request()->except('middleware'))->previousPageUrl() }}" @endif
                        class="btn btn-secondary @if($data->onFirstPage()) disabled @endif" aria-disabled="true"><i
                        class="fas fa-chevron-left"></i></a>
                </div>


                <div class="d-inline-block text-center">
                    <div class="col-auto">
                        <input
                            id="paginationPageNumber"
                            type="number"
                            class="form-control"
                            name="page"
                            onchange="this.form.submit()"
                            value="{{ $data->currentPage() }}"
                            min="1"
                            max="{{ $data->lastPage() }}"
                        />
                    </div>

                </div>

                <div class="d-inline-block">
                    <a @if($data->hasMorePages()) href="{{ $data->appends(request()->except('middleware'))->nextPageUrl() }}" @endif
                        class="btn btn-secondary @if(! $data->hasMorePages()) disabled @endif"><i
                        class="fas fa-chevron-right"></i>
                    </a>
                </div>

            <div>

        </div>
    </form>

@endif
