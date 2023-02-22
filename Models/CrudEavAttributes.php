<?php

namespace Impactasolucoes\Crud\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrudEavAttributes extends Model
{
    use SoftDeletes;

    protected $table = 'crud_eav_attributes';
    protected $guarded = ['id'];
}
