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
      $table->string('fabricacion')->nullable();
      $table->string('memoria', 50);
      $table->string('tipo_memoria', 50);
      $table->string('consumo', 50);
      $table->date('fecha');
      $table->string('imagen', 100);
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
