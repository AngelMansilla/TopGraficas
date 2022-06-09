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
      'imagen' => 'required|image|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
    ]);

    $noticia = new Noticia();
    $noticia->titulo = $request->titulo;
    $noticia->informacion = $request->informacion;
    $noticia->imagen = explode("/", $request->imagen->store('public/images'))[1];


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
      'imagen' => 'required|image|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
    ]);

    $noticia = Noticia::findOrFail($request->$id);
    $noticia->titulo = $request->titulo;
    $noticia->informacion = $request->informacion;
    $noticia->imagen = $request->imagen->store('images');

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
    $noticiaFind = Noticia::find($id);
    unlink(storage_path('app/' . $noticiaFind->imagen));
    return $noticia;
  }
}
