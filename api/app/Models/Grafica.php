<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grafica extends Model
{
  use HasFactory;
  protected $fillable = ['nombre', 'empresa', 'pvpr', 'arquitectura', 'memoria', 'tipo_memoria', 'consumo', 'fecha', 'imagen', 'user_id'];
}
