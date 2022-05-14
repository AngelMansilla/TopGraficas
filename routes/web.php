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
Route::get('/graficas', [GraficasController::class, 'index'])->name('graficas');

Route::post('/graficas', [GraficasController::class, 'store'])->name('graficas');

Route::get('/graficas/{id}', [GraficasController::class, 'show'])->name('graficas-edit');

Route::patch('/graficas/{id}', [GraficasController::class, 'update'])->name('graficas-update');

Route::delete('/graficas/{id}', [GraficasController::class, 'destroy'])->name('graficas-destroy');
