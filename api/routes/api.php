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
  Route::get('/graficas/{id}', 'show');
});

Route::controller(NoticiaController::class)->group(function () {
  Route::get('/noticias', 'index');
  Route::get('/noticias/{id}', 'show');
});

Route::controller(OfertaController::class)->group(function () {
  Route::get('/ofertas', 'index');
  Route::get('/ofertas/{id}', 'show');
});

Route::controller(ComentarioController::class)->group(function () {
  Route::get('/comentarios', 'index');
  Route::get('/comentarios/{id}', 'show');
});



Route::controller(ImagenController::class)->group(function () {
  Route::get('/imagenes/{id}', 'show');
});

Route::controller(AuthController::class)->group(function () {
  Route::post('/registrar', 'register');
  Route::post('/sesion', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
  Route::controller(AuthController::class)->group(function () {
    Route::get('/cerrarsesion', 'logout');
    Route::put('/usuarios/{id}', 'editUser');
  });

  Route::controller(OfertaController::class)->group(function () {
    Route::post('/ofertas', 'store');
    Route::put('/ofertas/{id}', 'update');
  });
  Route::controller(ComentarioController::class)->group(function () {
    Route::post('/comentarios', 'store');
    Route::put('/comentarios/{id}', 'update');
  });
    Route::controller(UserController::class)->group(function () {
    Route::get('/usuarios/{id}', 'show');
  });
});

Route::group(['middleware' => 'admin'], function () {
  Route::controller(GraficaController::class)->group(function () {
    Route::post('/graficas', 'store');
    Route::put('/graficas/{id}', 'update');
    Route::delete('/graficas/{id}', 'destroy');
  });
  Route::controller(NoticiaController::class)->group(function () {
    Route::post('/noticias', 'store');
    Route::put('/noticias/{id}', 'update');
    Route::delete('/noticias/{id}', 'destroy');
  });
  Route::controller(OfertaController::class)->group(function () {
    Route::delete('/ofertas/{id}', 'destroy');
  });
  Route::controller(ComentarioController::class)->group(function () {
    Route::delete('/comentarios/{id}', 'destroy');
  });
    Route::controller(UserController::class)->group(function () {
    Route::get('/usuarios', 'index');
    Route::delete('/usuarios/{id}', 'destroy');
  });

});