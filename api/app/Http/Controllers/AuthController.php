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
    $validator = Validator::make($request->all(), [
      'nombre' => 'required|string|max:191',
      'email' => 'required|string|max:191|email|unique:users',
      'password' => 'required|min:8|string|max:191',
      'apellido' => 'string|max:191',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|string|max:191',
      'ciudad' => 'string|max:191',
      'telefono' => 'string|max:191',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors());
    }

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
    $validator = Validator::make($request->all(), [
      'nombre' => 'required|string|max:191',
      'email' => 'required|string|max:191|email',
      'password' => 'required|min:8|string|max:191',
      'apellido' => 'string|max:191',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|string|max:191',
      'ciudad' => 'string|max:191',
      'telefono' => 'string|max:191',
    ]);

    if ($validator->fails()) {
      return response()->json($validator->errors());
    }

    $updateuser = User::where('email', $request['email'])->firstOrFail();

    $input = $request->all();
    $updateuser->fill($input)->save();
    $token = $updateuser->createToken('auth_token')->plainTextToken;

    return response()
      ->json(['data' => $updateuser, 'access_token' => $token, 'token_type' => 'Bearer',]);
  }

  public function login(Request $request)
  {
    if (!Auth::attempt($request->only('email', 'password'))) {
      return response()->json(['message' => 'Sin autorización'], 401);
    }
    $user = User::where('email', $request['email'])->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;

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
}
