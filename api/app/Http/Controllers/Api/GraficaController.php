<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grafica;
use Illuminate\Http\Request;

class GraficaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $graficas = Grafica::all();
    return $graficas;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
      'nombre' => 'required|min:3',
      'empresa' => 'required|min:3',
      'pvpr' => 'required|numeric|min:0|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
      'arquitectura' => 'required|min:3',
      'memoria' => 'required|min:1',
      'tipo_memoria' => 'required|min:1',
      'consumo' => 'required|min:1',
      'fecha' => 'required|date',
      'imagen' => 'required|image|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
    ]);

    $grafica = new Grafica();
    $grafica->nombre = $request->nombre;
    $grafica->empresa = $request->empresa;
    $grafica->pvpr = $request->pvpr;
    $grafica->arquitectura = $request->arquitectura;
    $grafica->memoria = $request->memoria;
    $grafica->tipo_memoria = $request->tipo_memoria;
    $grafica->consumo = $request->consumo;
    $grafica->fecha = $request->fecha;
    $grafica->imagen = explode("/", $request->imagen->store('../app/Http/Controllers/images'))[1];
    $grafica->user_id = auth()->user()->id;
    $grafica->save();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $grafica = Grafica::find($id);
    return $grafica;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $request->validate([
      'nombre' => 'required|min:3',
      'empresa' => 'required|min:3',
      'pvpr' => 'required|numeric|min:0|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
      'arquitectura' => 'required|min:3',
      'memoria' => 'required|min:1',
      'tipo_memoria' => 'required|min:1',
      'consumo' => 'required|min:1',
      'fecha' => 'required|date',
      'imagen' => 'required|image|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
    ]);

    $grafica = Grafica::find($id);

    $grafica->nombre = $request->nombre;
    $grafica->empresa = $request->empresa;
    $grafica->pvpr = $request->pvpr;
    $grafica->arquitectura = $request->arquitectura;
    $grafica->memoria = $request->memoria;
    $grafica->tipo_memoria = $request->tipo_memoria;
    $grafica->consumo = $request->consumo;
    $grafica->fecha = $request->fecha;
    $grafica->imagen = explode("/", $request->imagen->store('../app/Http/Controllers/images'))[1];

    $grafica->save();

    return $grafica;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $grafica = Grafica::destroy($id);
    return $grafica;
  }
}
