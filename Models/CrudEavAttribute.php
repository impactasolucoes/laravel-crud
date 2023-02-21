<?php

namespace Impactasolucoes\Crud\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrudEavAttribute extends Model
{
    use SoftDeletes;

    protected $table = 'crud_eav_attribute';
    protected $guarded = ['id'];
}
