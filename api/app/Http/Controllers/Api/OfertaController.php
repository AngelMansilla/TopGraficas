<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Oferta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\validator;

class OfertaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $ofertas = Oferta::all();
    return $ofertas;
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
      'titulo' => 'required|min:3',
      'precio' => array(
        'required',
        'regex:/^[\d]{0,11}(\.[\d]{1,2})?$/'
      ),
      'enlace' => 'required|min:3',
      'vendedor' => 'required|min:3',
      'grafica_id' => 'required',
    ]);

    $oferta = new Oferta();
    $oferta->titulo = $request->titulo;
    $oferta->precio = $request->precio;
    $oferta->enlace = $request->enlace;
    $oferta->descripcion = $request->descripcion;
    $oferta->vendedor = $request->vendedor;
    $oferta->grafica_id = $request->grafica_id;
    $oferta->user_id = auth()->user()->id;

    $oferta->save();
    return response()
      ->json(['data' => $oferta]);
  }


  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $oferta = Oferta::find($id);
    return $oferta;
  }

  public function search($id)
  {
    $ofertas = Oferta::all()->where('grafica_id', $id);
    return $ofertas;
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
      'titulo' => 'required|min:3',
      'precio' => array(
        'required',
        'regex:/^[\d]{0,11}(\.[\d]{1,2})?$/'
      ),
      'enlace' => 'required|min:3',
      'vendedor' => 'required|min:3',
      'grafica_id' => 'required',
    ]);

    $oferta = Oferta::find($id);
      $oferta->titulo = $request->titulo;
      $oferta->precio = $request->precio;
      $oferta->enlace = $request->enlace;
      $oferta->descripcion = $request->descripcion;
      $oferta->vendedor = $request->vendedor;
      $oferta->grafica_id = $request->grafica_id;
      $oferta->save();

    return response()
      ->json(['data' => $oferta]);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $oferta = Oferta::destroy($id);
    return $oferta;
  }
}
