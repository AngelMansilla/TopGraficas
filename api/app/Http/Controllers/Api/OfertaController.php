<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Oferta;
use Illuminate\Http\Request;

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
      'precio' => 'required|numeric|min:0|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
      'votos' => 'required|numeric',
      'enlace' => 'required|min:3',
      'descipcion' => 'required|min:3',
      'vendedor' => 'required|min:3',
    ]);

    $oferta = new Oferta();
    $oferta->titulo = $request->titulo;
    $oferta->precio = $request->precio;
    $oferta->votos = $request->votos;
    $oferta->enlace = $request->enlace;
    $oferta->descipcion = $request->descipcion;
    $oferta->vendedor = $request->vendedor;

    $oferta->save();
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
    if (auth()->user()->is_admin || auth()->user()->id == $request->user_id) {
      $request->validate([
        'titulo' => 'required|min:3',
        'precio' => 'required|numeric|min:0|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
        'votos' => 'required|numeric',
        'enlace' => 'required|min:3',
        'descipcion' => 'required|min:3',
        'vendedor' => 'required|min:3',
      ]);

      $oferta = Oferta::findOrFail($request->$id);
      $oferta->titulo = $request->titulo;
      $oferta->precio = $request->precio;
      $oferta->votos = $request->votos;
      $oferta->enlace = $request->enlace;
      $oferta->descipcion = $request->descipcion;
      $oferta->vendedor = $request->vendedor;

      $oferta->save();
      return $oferta;
    } else {
      return redirect('/');
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $ofertaFind = Oferta::findOrFail($id);
    if (auth()->user()->is_admin || auth()->user()->id == $ofertaFind->user_id) {
      $oferta = Oferta::destroy($id);
      return $oferta;
    } else {
      return redirect('/');
    }
  }
}
