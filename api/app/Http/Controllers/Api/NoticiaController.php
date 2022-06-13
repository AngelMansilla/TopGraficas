<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;

class NoticiaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $noticias = Noticia::all();
    return $noticias;
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
      'imagen' => 'required'
    ]);

    $noticia = new Noticia();
    $noticia->titulo = $request->titulo;
    $noticia->informacion = $request->informacion;
    $noticia->imagen = $request->imagen;

    $noticia->save();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $noticia = Noticia::find($id);
    return $noticia;
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
      'imagen' => 'required'
    ]);

    $noticia = Noticia::where('id', $request->$id)->get();
    $noticia->titulo = $request->titulo;
    $noticia->informacion = $request->informacion;
    $noticia->imagen = $request->imagen;

    $noticia->save();

    return $noticia;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $noticia = Noticia::destroy($id);
    return $noticia;
  }
}
