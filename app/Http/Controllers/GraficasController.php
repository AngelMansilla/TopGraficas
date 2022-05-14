<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grafica;

class GraficasController extends Controller
{

  public function store(Request $request)
  {
    $request->validate([
      'nombre' => 'required|min:3',
      'empresa' => 'required|min:3',
      'pvpr' => 'required|numeric|min:0|regex:/^[\d]{0,11}(\.[\d]{1,2})?$/',
      'arquitectura' => 'min:3',
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
    $grafica->imagen = $request->imagen->store('images');

    $grafica->save();

    return redirect()->route('graficas')->with('success', 'Publicación realizada correctametne');
  }

  public function index()
  {
    $graficas = Grafica::all();
    return view('graficas.index', ['graficas' => $graficas]);
  }

  public function show($id)
  {
    $grafica = Grafica::find($id);
    return view('graficas.show', ['grafica' => $grafica]);
  }

  public function update()
  {
    $graficas = Grafica::all();
    return view('graficas.index', ['graficas' => $graficas]);
  }

  public function destroy()
  {
    $graficas = Grafica::all();
    return view('graficas.index', ['graficas' => $graficas]);
  }
}
