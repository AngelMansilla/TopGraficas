<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\validator;

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
    $validator = Validator::make($request->all(), [
      'titulo' => 'required|min:3',
      'informacion' => 'required|min:3',
      'imagen' => 'required'
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $noticia = new Noticia();
    $noticia->titulo = $request->titulo;
    $noticia->informacion = $request->informacion;
    $noticia->imagen = $request->imagen;
    $noticia->user_id = auth()->user()->id;

    $noticia->save();
    return response()
      ->json(['data' => $noticia]);
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
    $validator = Validator::make($request->all(), [
      'titulo' => 'required|min:3',
      'informacion' => 'required|min:3',
      'imagen' => 'required'
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    $noticia = Noticia::find($id);
    $noticia->titulo = $request->titulo;
    $noticia->informacion = $request->informacion;
    $noticia->imagen = $request->imagen;

    $noticia->save();

    return response()
      ->json(['data' => $noticia]);
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
