<?php

namespace Impactasolucoes\Crud\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrudEavConfigs extends Model
{
    use SoftDeletes;

    protected $table = 'crud_configs';
    protected $guarded = ['id'];
}
