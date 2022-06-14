<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImagenController extends Controller
{

  public function show($id)
  {
    define('ROOT_PATH', dirname(__DIR__) . '/');
    // return response()->file(storage_path('app/public/images/' . $id));

    return response()->file(ROOT_PATH . '../../../storage/app/public/images/' . $id);
  }
}
