<?php

use App\Http\Controllers\Api\ComentarioController;
use App\Http\Controllers\Api\GraficaController;
use App\Http\Controllers\Api\NoticiaController;
use App\Http\Controllers\Api\OfertaController;
use App\Http\Controllers\Api\UserController;
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
  return $request->user();
});

Route::controller(GraficaController::class)->group(function () {
  Route::get('/graficas', 'index');
  Route::post('/graficas', 'store');
  Route::get('/graficas/{id}', 'show');
  Route::put('/graficas/{id}', 'update');
  Route::delete('/graficas/{id}', 'destroy');
});

Route::controller(NoticiaController::class)->group(function () {
  Route::get('/noticias', 'index');
  Route::post('/noticias', 'store');
  Route::get('/noticias/{id}', 'show');
  Route::put('/noticias/{id}', 'update');
  Route::delete('/noticias/{id}', 'destroy');
});

Route::controller(ComentarioController::class)->group(function () {
  Route::get('/comentarios', 'index');
  Route::post('/comentarios', 'store');
  Route::get('/comentarios/{id}', 'show');
  Route::put('/comentarios/{id}', 'update');
  Route::delete('/comentarios/{id}', 'destroy');
});

Route::controller(UserController::class)->group(function () {
  Route::get('/ususarios', 'index');
  Route::post('/ususarios', 'store');
  Route::get('/ususarios/{id}', 'show');
  Route::put('/ususarios/{id}', 'update');
  Route::delete('/ususarios/{id}', 'destroy');
});

Route::controller(OfertaController::class)->group(function () {
  Route::get('/ofertas', 'index');
  Route::post('/ofertas', 'store');
  Route::get('/ofertas/{id}', 'show');
  Route::put('/ofertas/{id}', 'update');
  Route::delete('/ofertas/{id}', 'destroy');
});
