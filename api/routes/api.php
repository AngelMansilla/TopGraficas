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

Route::controller(AuthController::class)->group(function () {
  Route::post('/registrar', 'register');
  Route::post('/sesion', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
  Route::controller(AuthController::class)->group(function () {
    Route::get('/cerrarsesion', 'logout');
    Route::get('/usuario/{id}', 'getUser');
    Route::put('/usuario', 'editUser');
  });

  Route::controller(OfertaController::class)->group(function () {
    Route::post('/oferta', 'store');
    Route::put('/oferta/{id}', 'update');
    Route::delete('/oferta/{id}', 'destroy');
  });
});

Route::group(['middleware' => ['auth:sanctum', 'abilities:admin']], function () {
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
});
