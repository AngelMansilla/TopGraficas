<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\validator;
use App\Models\User;

class AuthController extends Controller
{
  public function register(Request $request)
  {

    $request->validate([
      'nombre' => 'required|string|max:191',
      'email' =>  'required|min:3',
      'password' => 'required|min:8',
      'apellido' => 'max:191',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|string|max:191',
      'ciudad' => 'max:191',
      'telefono' => 'max:9',
    ]);

    $user = User::create([
      'nombre' => $request->nombre,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'apellido' => $request->apellido,
      'telefono' => $request->telefono,
      'pais' => $request->pais,
      'ciudad' => $request->ciudad,
      'fecha_nacimiento' => $request->fecha_nacimiento,
      'is_admin' => 0
    ]);
    return response()
      ->json(['data' => $user]);
  }

  public function editUser(Request $request)
  {
    $request->validate([
      'nombre' => 'required|string|max:191',
      'email' =>  'required|min:3',
      'password' => 'required|min:8',
      'apellido' => 'max:191',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|string|max:191',
      'ciudad' => 'max:191',
      'telefono' => 'max:9',
    ]);


    $updateuser = User::where('email', $request['email'])->firstOrFail();

    $updateuser->nombre = $request->nombre;
    $updateuser->email = $request->email;
    $updateuser->password = Hash::make($request->password);
    $updateuser->apellido = $request->apellido;
    $updateuser->fecha_nacimiento = $request->fecha_nacimiento;
    $updateuser->pais = $request->pais;
    $updateuser->ciudad = $request->ciudad;
    $updateuser->telefono = $request->telefono;

    $updateuser->save();

    return response()
      ->json(['data' => $updateuser]);
  }

  public function login(Request $request)
  {
    $request->validate([

      'email' =>  'required|min:3',
      'password' => 'required|min:8',
    ]);

    $user = User::where('email', $request['email'])->firstOrFail();
    if ($user['is_admin'] === 1) {
      $token = $user->createToken($request['email'], ['admin'])->plainTextToken;
    } else {
      $token = $user->createToken($request['email'])->plainTextToken;
    }

    return response()
      ->json([
        'message' => 'Hola ' . $user->nombre,
        'accessToken' => $token,
        'token_type' => 'Bearer',
        'user' => $user,
      ]);
  }

  public function logout()
  {
    if (Auth::check()) {
      auth()->user()->tokens()->delete();
      return [
        'message' => 'Has finalizado sesión correctamente'
      ];
    }
  }

  public function getUser($id)
  {
    $user = User::find($id);
    return $user;
  }
}
