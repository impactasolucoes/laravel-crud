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
        Schema::create('crud_configs', function (Blueprint $table) {
            $table->id();
            $table->string('crud_name', 255)->index();
            $table->string('config_name', 255);
            $table->text('config_value')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('crud_eav_attributes', function (Blueprint $table) {
            $table->id();
            $table->string('crud_name', 255)->index();
            $table->string('attribute_type', 255);
            $table->string('attribute_label', 255);
            $table->text('attribute_values')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('crud_eav_values', function (Blueprint $table) {
            $table->id();
            $table->string('crud_name', 255);
            $table->integer('entity_id');
            $table->integer('attribute_id');
            $table->text('value_text')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['crud_name', 'entity_id'], 'crud_name_id');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crud_configs');
        Schema::dropIfExists('crud_eav_attributes');
        Schema::dropIfExists('crud_eav_values');
    }

};
