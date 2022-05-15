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
    Schema::create('comentarios', function (Blueprint $table) {
      $table->id();
      $table->string('titulo', 50)->unique();
      $table->string('informacion', 10000);
      $table->bigInteger('votos');
      $table->unsignedBigInteger('user_id');
      $table->foreign('user_id')->references('id')->on('users')
        ->onDelete("cascade")
        ->onUpdate("cascade");
      $table->unsignedBigInteger('oferta_id');
      $table->foreign('oferta_id')->references('id')->on('ofertas')
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
    Schema::dropIfExists('comentarios');
  }
};
