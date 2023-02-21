<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        // crud_eav_values
        //     id
        //     entity_name         tbclientes
        //     entity_id           1
        //     attribute_id        1
        //     value               07/04/1987
        //     created_at          now()
        //     updated_at          now()
        //     deleted_at          null

        Schema::create('crud_eav_values', function (Blueprint $table) {
            $table->id();
            $table->string('entity_name', 255);
            $table->integer('entity_id');
            $table->integer('attribute_id');
            $table->text('value');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['entity_name', 'entity_id'], 'entity_name_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crud_eav_values');
    }
};
