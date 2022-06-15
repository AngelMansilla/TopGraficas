<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grafica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\validator;

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
    $validator = Validator::make($request->all(), [
      'nombre' => 'required|min:3',
      'empresa' => 'required|min:3',
      'pvpr' => 'required|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
      'arquitectura' => 'required',
      'memoria' => 'required',
      'tipo_memoria' => 'required',
      'consumo' => 'required',
      'fecha' => 'required|date',
      'imagen' => 'required'
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $grafica = new Grafica();
    $grafica->nombre = $request->nombre;
    $grafica->empresa = $request->empresa;
    $grafica->pvpr = $request->pvpr;
    $grafica->arquitectura = $request->arquitectura;
    $grafica->memoria = $request->memoria;
    $grafica->tipo_memoria = $request->tipo_memoria;
    $grafica->consumo = $request->consumo;
    $grafica->fecha = $request->fecha;
    $grafica->imagen = $request->imagen;
    $grafica->user_id = auth()->user()->id;

    $grafica->save();

    return response()
      ->json(['data' => $grafica]);
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

    $validator = Validator::make($request->all(), [
      'nombre' => 'required|min:3',
      'empresa' => 'required|min:3',
      'pvpr' => 'required|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
      'arquitectura' => 'required',
      'memoria' => 'required',
      'tipo_memoria' => 'required',
      'consumo' => 'required',
      'fecha' => 'required|date',
      'imagen' => 'required'
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $grafica = Grafica::find($id);

    $grafica->nombre = $request->nombre;
    $grafica->empresa = $request->empresa;
    $grafica->pvpr = $request->pvpr;
    $grafica->arquitectura = $request->arquitectura;
    $grafica->memoria = $request->memoria;
    $grafica->tipo_memoria = $request->tipo_memoria;
    $grafica->consumo = $request->consumo;
    $grafica->fecha = $request->fecha;
    $grafica->imagen = $request->imagen;

    $grafica->save();

    return response()
      ->json(['data' => $grafica]);
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
