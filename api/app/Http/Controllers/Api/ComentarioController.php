<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $comentarios = Comentario::all();
    return $comentarios;
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
      'informacion' => 'required|min:3',
      'votos' => 'required|numeric',
    ]);

    $comentario = new Comentario();
    $comentario->titulo = $request->titulo;
    $comentario->informacion = $request->informacion;
    $comentario->votos = $request->votos;

    $comentario->save();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $comentario = Comentario::find($id);
    return $comentario;
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
      'informacion' => 'required|min:3',
      'votos' => 'required|numeric',
    ]);

    $comentario = Comentario::findOrFail($request->$id);
    $comentario->titulo = $request->titulo;
    $comentario->informacion = $request->informacion;
    $comentario->votos = $request->votos;

    $comentario->save();
    return $comentario;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $comentario = Comentario::destroy($id);
    return $comentario;
  }
}
