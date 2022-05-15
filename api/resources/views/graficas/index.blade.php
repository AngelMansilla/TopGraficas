@extends('app')

@section('content')
<div class="container w-50 border p-4 mt-4">
  <h1 class="text-center">Publicar Grafica</h1>
  <form class="row g-3" name="publicar-grafica" method="POST" enctype="multipart/form-data" action="{{ route('graficas') }}">
    @csrf
    <!-- Seguridad contra las falsificaciones de solicitudes entre sitios son un tipo de explotación maliciosa mediante la cual se ejecutan comandos no autorizados en nombre de un usuario autenticado.
        Genera un token para identificar si es un usuario valido en esta sesion.
  -->
    @if (session('success'))
    <h6 class="alert alert-success">{{ session('success') }}</h6>
    @endif

    <div class="col-md-6">
      @error('nombre')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputNombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" name="nombre" id="inputNombre">
    </div>
    <div class="col-md-6">
      @error('empresa')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputEmpresa" class="form-label">Empresa</label>
      <input type="text" class="form-control" name="empresa" id="inputEmpresa">
    </div>
    <div class="col-md-6">
      @error('pvpr')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputPVPR" class="form-label">PVPR (€)</label>
      <input type="number" class="form-control" name="pvpr" id="inputPVPR" step='0.01'>
    </div>
    <div class="col-md-6">
      @error('arquitectura')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputArquitectura" class="form-label">Arquitectura</label>
      <input type="text" class="form-control" name="arquitectura" id="inputArquitectura">
    </div>
    <div class="col-md-6">
      @error('memoria')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputMemoria" class="form-label">Memoria (GB)</label>
      <input type="number" class="form-control" name="memoria" id="inputMemoria">
    </div>
    <div class="col-md-6">
      @error('tipo_memoria')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputTipo_memoria" class="form-label">Tipo de memoria</label>
      <input type="text" class="form-control" name="tipo_memoria" id="inputTipo_memoria">
    </div>
    <div class="col-md-6">
      @error('consumo')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputConsumo" class="form-label">Consumo (Vatios)</label>
      <input type="number" class="form-control" name="consumo" id="inputConsumo">
    </div>
    <div class="col-md-6">
      @error('fecha')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputFecha" class="form-label">Fecha</label>
      <input type="date" class="form-control" name="fecha" id="inputFecha">
    </div>
    <div class="col-12">
      @error('imagen')
      <h6 class="alert alert-danger">{{ $message }}</h6>
      @enderror
      <label for="inputImagen" class="form-label">Imagen</label>
      <input type="file" class="form-control" name="imagen" id="inputImagen">
    </div>
    <div class="col-12 text-center">
      <button type="submit" class="btn btn-primary">Publicar</button>
    </div>
  </form>
  <div>
    @foreach ($graficas as $grafica)
    <div class="row py-1">
      <div class="col-md-9 d-flex align-items-center">
        <a href="{{ route('graficas-edit', ['id' => $grafica->id]) }}">{{ $grafica->nombre }}</a>
      </div>
      <div class="col-md-3 d-flex justify-content-end">
        <form action="{{ route('graficas-destroy', [$grafica->id]) }}" method="POST">
          @method('DELETE')
          @csrf
          <button class="btn btn-danger btn-sm">Eliminar</button>
        </form>
      </div>
    </div>

    @endforeach
  </div>
</div>

@endsection