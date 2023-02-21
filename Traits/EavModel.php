<?php


namespace Impactasolucoes\Crud\Traits;

use Impactasolucoes\Crud\Models\CrudEavValue;

trait EavModel
{

    /**
     * Get all of the post's comments.
     */
    public function crud_eav_values()
    {
        return $this->morphMany(CrudEavValue::class, 'crud_eav_values', 'entity_name', 'entity_id');
    }


}