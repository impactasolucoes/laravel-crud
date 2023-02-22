<?php

namespace Impactasolucoes\Crud\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrudEavValues extends Model
{
    use SoftDeletes;

    protected $table = 'crud_eav_values';
    protected $guarded = ['id'];

}
