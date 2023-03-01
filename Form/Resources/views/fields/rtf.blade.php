<div class="mb-3" @if ($label) data-rtf="{{ $label }}" @endif>
    @if ($label)
        <label class="col-sm-3 col-form-label font-weight-bold px-0" for="c-{{ $id }}">
            @if ($required)
                <span class="text-danger">*</span>
            @endif
            {{ $label }}:
            @if ($help)
                <a data-bs-toggle="tooltip" data-bs-placement="right" title="{{ $help }}">
                    <i class="fa-regular fa-circle-question"></i>
                </a>
            @endif

        </label>

    @endif
    <div
        class="@if ($col >= '10') col @else col-md-{{ $col }} @endif mt-2 @if ($label) px-0 @endif">
        <textarea class="form-control {{ $class }}" data-type="summernote" id="c-{{ $id }}"
            name="{{ $id }}" @if ($required) required @endif rows="3">{{ $value ?? '' }}</textarea>

        <div class="invalid-feedback"></div>
    </div>
</div>
