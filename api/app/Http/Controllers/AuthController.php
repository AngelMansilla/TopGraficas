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
      'nombre' => 'required|string|min:3',
      'email' => 'required|string|min:3|email|unique:users|regex:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/',
      'password' => 'required|regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/',
      'apellido' => 'string|min:3',
      'fecha_nacimiento' => 'required|date',
      'pais' => 'required|string|min:3',
      'ciudad' => 'string|min:3',
      'telefono' => 'string|regex:/^\d{9}$/',
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

    if($updateuser['is_admin'] === 1){
      $token = $updateuser->createToken($request['email'], ['admin'])->plainTextToken;
    }else{
      $token = $updateuser->createToken($request['email'])->plainTextToken;
    }

    return response()
      ->json(['data' => $updateuser, 'access_token' => $token, 'token_type' => 'Bearer',]);
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required|string|min:6'
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }
    if (!Auth::attempt($validator->validated())) {
      return response()->json(['message' => 'Sin autorización'], 401);
    }
    $user = User::where('email', $request['email'])->firstOrFail();
    if($user['is_admin'] === 1){
      $token = $user->createToken($request['email'], ['admin'])->plainTextToken;
    }else{
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
}
