@extends('app')

@section('content')
<div class="container w-50 border p-4 mt-4">
  <h1 class="text-center">Publicar Grafica</h1>
  <form class="row g-3" name="publicar-grafica" method="POST" enctype="multipart/formdata" action="{{ route('graficas') }}">
    @csrf
    <!-- Seguridad contra las falsificaciones de solicitudes entre sitios son un tipo de explotación maliciosa mediante la cual se ejecutan comandos no autorizados en nombre de un usuario autenticado.
               Genera un token para identificar si es un usuario valido en esta sesion.
  -->
    <div class="col-md-6">
      <label for="inputNombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="inputNombre" min="3" required">
    </div>
    <div class="col-md-6">
      <label for="inputEmpresa" class="form-label">Empresa</label>
      <input type="text" class="form-control" id="inputEmpresa" min="3" required>
    </div>
    <div class="col-md-6">
      <label for="inputPVPR" class="form-label">PVPR</label>
      <input type="number" class="form-control" id="inputPVPR" step=".01" min="0" value="0" required>
    </div>
    <div class="col-md-6">
      <label for="inputArquitectura" class="form-label">Arquitectura</label>
      <input type="text" class="form-control" id="inputArquitectura" min="3">
    </div>
    <div class="col-md-6">
      <label for="inputMemoria" class="form-label">Memoria (GB)</label>
      <input type="number" class="form-control" id="inputMemoria" min="1" required>
    </div>
    <div class="col-md-6">
      <label for="inputTipo_memoria" class="form-label">Tipo de memoria</label>
      <input type="text" class="form-control" id="inputTipo_memoria" min="1" required>
    </div>
    <div class="col-md-6">
      <label for="inputConsumo" class="form-label">Consumo (Vatios)</label>
      <input type="number" class="form-control" id="inputConsumo" min="1" required>
    </div>
    <div class="col-md-6">
      <label for="inputFecha" class="form-label">Fecha</label>
      <input type="date" class="form-control" id="inputFecha" required>
    </div>
    <div class="col-12">
      <label for="inputImagen" class="form-label">Imagen</label>
      <input type="file" class="form-control" id="inputImagen" required>
    </div>
    <div class="col-12 text-center">
      <button type="submit" class="btn btn-primary">Publicar</button>
    </div>
  </form>
</div>

@endsection