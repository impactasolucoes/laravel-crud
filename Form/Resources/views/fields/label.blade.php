<label class="col-sm-3 col-form-label font-weight-bold fw-bold" for="c-{{ $id }}">
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
