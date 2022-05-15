<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
  use HasFactory;
  protected $fillable = ['titulo', 'informacion', 'votos', 'user_id', 'oferta_id'];
}
