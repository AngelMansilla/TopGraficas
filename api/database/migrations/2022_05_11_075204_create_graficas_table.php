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
    Schema::create('graficas', function (Blueprint $table) {
      $table->id();
      $table->string('nombre', 50)->unique();
      $table->string('empresa', 50);
      $table->float('pvpr', 50);
      $table->string('arquitectura', 50);
      $table->string('memoria', 50);
      $table->string('tipo_memoria', 50);
      $table->string('consumo', 50);
      $table->date('fecha');
      $table->string('imagen', 100);
      $table->unsignedBigInteger('user_id');
      $table->foreign('user_id')->references('id')->on('users')
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
    Schema::dropIfExists('graficas');
  }
};
