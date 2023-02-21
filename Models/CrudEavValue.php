<?php

namespace Impactasolucoes\Crud\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrudEavValue extends Model
{
    use SoftDeletes;

    protected $table = 'crud_eav_values';
    protected $guarded = ['id'];

    public function crud_eav_values()
    {
        return $this->morphTo('crud_eav_values', 'entity_name', 'entity_id');
    }
}
