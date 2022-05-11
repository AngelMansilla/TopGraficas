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
      $table->string('nombre')->unique();
      $table->string('empresa');
      $table->float('pvpr');
      $table->string('fabricacion')->nullable();
      $table->string('memoria');
      $table->string('tipo_memoria');
      $table->string('consumo');
      $table->string('imagen');
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
