<?php

namespace Impactasolucoes\Crud\Traits;

use Impactasolucoes\Crud\Models\CrudEavValues;

trait EavModel
{
    public $crudName;

    public static function withEavValues(string $crudName)
    {
        return (new self)->with(['crud_eav_values' => function($query) use ($crudName){
            $query->where('crud_name', $crudName);
        }]);
    }

    public function crud_eav_values()
    {
        return $this->hasMany(CrudEavValues::class, 'entity_id', 'id');
    }

    public function crudEavAttribute()
    {
        return 'x';
    }

}