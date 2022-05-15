<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $users = User::all();
    return $users;
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
      'email' => 'required|min:3',
      'contraseña' => 'required|min:6',
      'apellido' => 'min:3',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|min:1',
      'ciudad' => 'required|min:1',
      'telefono' => 'required|min:1',
    ]);

    $user = new User();
    $user->nombre = $request->nombre;
    $user->email = $request->email;
    $user->contraseña = $request->contraseña;
    $user->apellido = $request->apellido;
    $user->telefono = $request->telefono;
    $user->pais = $request->pais;
    $user->ciudad = $request->ciudad;
    $user->fecha_nacimiento = $request->fecha_nacimiento;
    $user->is_admin = false;

    $user->save();
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $user = User::find($id);
    return $user;
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
      'email' => 'required|min:3',
      'contraseña' => 'required|min:6',
      'apellido' => 'min:3',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|min:1',
      'ciudad' => 'required|min:1',
      'telefono' => 'required|min:1',
    ]);

    $user = User::findOrFail($request->$id);
    $user->nombre = $request->nombre;
    $user->email = $request->email;
    $user->contraseña = $request->contraseña;
    $user->apellido = $request->apellido;
    $user->telefono = $request->telefono;
    $user->pais = $request->pais;
    $user->ciudad = $request->ciudad;
    $user->fecha_nacimiento = $request->fecha_nacimiento;
    $user->is_admin = false;

    $user->save();
    return $user;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $user = User::destroy($id);
    return $user;
  }
}
