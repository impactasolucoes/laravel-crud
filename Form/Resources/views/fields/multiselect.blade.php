<div class="mb-3 row align-items-center">

    @include('form::fields.label')

    <div class="@if($col >= '10') col @else col-md-{{$col}} @endif">
        <select
            multiple
            class="form-control {{ $class }} d-none"
            id="c-{{$id}}"
            name="{{$id}}[]"

            {{-- Attributes --}}
            @foreach ($attrs as $attr => $attrValue)
                @if(gettype($attrValue) == 'string')
                    {{ $attr }}="{{ $attrValue }}"
                @endif
            @endforeach

            @if($required)
                required
            @endif
        >
            {{-- Build selectOptions --}}
            @foreach ($selectOptions as $id => $option)
                <option
                    @if(is_array($value) && in_array($id, $value))
                    selected
                    @endif
                    value="{{$id}}">{{$option}}
                </option>
            @endforeach

        </select>
        <div class="invalid-feedback"></div>
    </div>
</div>
