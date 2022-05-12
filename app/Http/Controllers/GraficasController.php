<?php

namespace App\Http\Controllers;

use App\Models\Grafica;
use Illuminate\Http\Request;

class GraficasController extends Controller
{

  public function store(request $request)
  {
    $request->validate([
      'nombre' => 'required|min:3',
      'empresa' => 'required|min:3',
      'pvpr' => 'required|numeric|min:0',
      'fabricacion' => 'min:1',
      'memoria' => 'requiered|min:1',
      'tipo_memoria' => 'requiered|min:1',
      'consumo' => 'requiered|min:1',
      'imagen' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000'
    ]);

    $grafica = new Grafica();
    $grafica->nombre = $request->nombre;
    $grafica->empresa = $request->empresa;
    $grafica->pvpr = $request->pvpr;
    $grafica->fabricacion = $request->fabricacion;
    $grafica->memoria = $request->memoria;
    $grafica->tipo_memoria = $request->tipo_memoria;
    $grafica->consumo = $request->consumo;
    $grafica->imagen = $request->imagen;

    $grafica->save();

    return redirect()->route('graficas')->with('success', 'Publicación realizada correctametne');
  }
}
