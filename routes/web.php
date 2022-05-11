<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GraficasController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
  return view('ofertas.index');
});
Route::get('/graficas', function () {
  return view('graficas.index');
});

Route::post('/graficas', [GraficasController::class, 'grafica'])->name('graficas');
