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
        Schema::create('ofertas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 50)->unique();
            $table->float('precio', 8,2);
            $table->bigInteger('votos');
            $table->string('enlace', 50);
            $table->string('descripcion', 200);
            $table->string('vendedor', 50);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')
              ->onDelete("cascade")
              ->onUpdate("cascade");
            $table->unsignedBigInteger('grafica_id');
            $table->foreign('grafica_id')->references('id')->on('graficas')
              ->onDelete("cascade")
              ->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ofertas');
    }
};
