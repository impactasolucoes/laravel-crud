<form method="get" class="frmBusca mb-3">
    <div class="form-group">
        <div class="input-group">
            @forelse($keepQueryStrings as $i => $field)
                <input type="hidden"
                       name="{{ $field }}"
                       value="{{ request()->get($field) ?? '' }}"
                       class="form-control"
                />
            @empty
            @endforelse
            <div class="input-group mb-3">
                <input
                    type="text"
                    class="form-control"
                    name="q"
                    value="{{ request()->get('q') ?? '' }}"
                    placeholder="{{ __('listing::listing.search') }}"
                    aria-label="{{ __('listing::listing.search') }}"
                >
                @if(request()->get('to_field_id'))
                <input hidden name="to_field_id" value="{{ request()->get('to_field_id') }}">
                <input hidden name="from_field_id" value="{{ request()->get('from_field_id') }}">
                <input hidden name="is_popup" value="1">
                @endif

                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button class="btn btn-outline-primary mb-0" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                      <span id="basic-addon2"><i class="fas fa-search"></i></span>
                    </button>
                    <div class="btn-group" role="group">
                        <button
                            id="buscaAvancadaBtn"
                            type="button"
                            class="btn btn-outline-primary mb-0 dropdown-toggle"
                            data-toggle="modal"
                            data-target="#modalBuscaAvancada"
                            data-bs-toggle="modal"
                            data-bs-target="#modalBuscaAvancada"
                        ></button>
                    </div>
                </div>
                @if($isSearching)
                    @if(request()->get('to_field_id'))
                        <a href="{{ request()->url() }}?is_popup=1&to_field_id={{ request()->get('to_field_id') }}&from_field_id={{ request()->get('from_field_id') }}"
                           class="btn close" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </a>
                    @else
                        <a href="{{ request()->url() }}" class="btn close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    @endif
                @endif
            </div>

        </div>
    </div>
</form>

@if( count($advancedSearchFields) > 0)

    @include('listing::advancedsearch.form')

@endif
