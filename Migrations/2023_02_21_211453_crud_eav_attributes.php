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
        Schema::create('crud_eav_attributes', function (Blueprint $table) {
            $table->id();
            $table->string('entity_name', 255);
            $table->string('attribute_type', 255);
            $table->string('attribute_label', 255);
            $table->string('attribute_mask', 255);
            $table->text('attribute_values');
            $table->timestamps();
            $table->softDeletes();

            $table->index('entity_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crud_eav_attributes');
    }
};
