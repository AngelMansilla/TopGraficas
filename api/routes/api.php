<?php

use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\GraficaController;
use App\Http\Controllers\Api\NoticiaController;
use App\Http\Controllers\Api\OfertaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ImagenController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  // return $request->user();
  return response()
    ->json([
      'usuario' => $request->user(),
    ]);
});

Route::controller(GraficaController::class)->group(function () {
  Route::get('/graficas', 'index');
  Route::get('/grafica/{id}', 'show');
});

Route::controller(NoticiaController::class)->group(function () {
  Route::get('/noticias', 'index');
  Route::get('/noticia/{id}', 'show');
});

Route::controller(OfertaController::class)->group(function () {
  Route::get('/ofertas', 'index');
  Route::get('/oferta/{id}', 'show');
  Route::get('/ofertas/{id}', 'search');
});

Route::controller(ComentarioController::class)->group(function () {
  Route::get('/comentarios', 'index');
  Route::get('/comentario/{id}', 'show');
});



Route::controller(ImagenController::class)->group(function () {
  Route::get('/imagen/{id}', 'show');
});

Route::controller(AuthController::class)->group(function () {
  Route::post('/registrar', 'register');
  Route::post('/sesion', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
  Route::controller(AuthController::class)->group(function () {
    Route::get('/cerrarsesion', 'logout');
    Route::put('/usuario/{id}', 'editUser');
  });

  Route::controller(OfertaController::class)->group(function () {
    Route::post('/oferta', 'store');
    Route::put('/oferta/{id}', 'update');
  });
  Route::controller(ComentarioController::class)->group(function () {
    Route::post('/comentario', 'store');
    Route::put('/comentario/{id}', 'update');
  });
  Route::controller(UserController::class)->group(function () {
    Route::get('/usuario/{id}', 'show');
  });
});

Route::group(['middleware' => 'admin'], function () {
  Route::controller(GraficaController::class)->group(function () {
    Route::post('/grafica', 'store');
    Route::put('/grafica/{id}', 'update');
    Route::delete('/grafica/{id}', 'destroy');
  });
  Route::controller(NoticiaController::class)->group(function () {
    Route::post('/noticia', 'store');
    Route::put('/noticia/{id}', 'update');
    Route::delete('/noticia/{id}', 'destroy');
  });
  Route::controller(OfertaController::class)->group(function () {
    Route::delete('/oferta/{id}', 'destroy');
  });
  Route::controller(ComentarioController::class)->group(function () {
    Route::delete('/comentario/{id}', 'destroy');
  });
  Route::controller(UserController::class)->group(function () {
    Route::get('/usuarios', 'index');
    Route::delete('/usuario/{id}', 'destroy');
  });
});
