@extends('app')

@section('content')
<div class="container w-50 border p-4 mt-4">
  <h1 class="text-center">Publicar Grafica</h1>
  <form class="row g-3" name="publicar-grafica" type="POST" enctype="multipart/formdata" action="{{ route('graficas') }}">
    <div class="col-md-6">
      <label for="inputNombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="inputNombre">
    </div>
    <div class="col-md-6">
      <label for="inputEmpresa" class="form-label">Empresa</label>
      <input type="text" class="form-control" id="inputEmpresa">
    </div>
    <div class="col-md-6">
      <label for="inputPVPR" class="form-label">PVPR</label>
      <input type="number" class="form-control" id="inputPVPR">
    </div>
    <div class="col-md-6">
      <label for="inputFabricacion" class="form-label">Fabricacion</label>
      <input type="text" class="form-control" id="inputFabricacion">
    </div>
    <div class="col-md-6">
      <label for="inputMemoria" class="form-label">Memoria (GB)</label>
      <input type="number" class="form-control" id="inputMemoria">
    </div>
    <div class="col-md-6">
      <label for="inputTipo_memoria" class="form-label">Tipo de memoria</label>
      <input type="text" class="form-control" id="inputTipo_memoria">
    </div>
    <div class="col-md-6">
      <label for="inputConsumo" class="form-label">Consumo (Vatios)</label>
      <input type="number" class="form-control" id="inputConsumo">
    </div>
    <div class="col-md-6">
      <label for="inputImagen" class="form-label">Imagen</label>
      <input type="file" class="form-control" id="inputImagen">
    </div>
    <div class="col-12 text-center">
      <button type="submit" class="btn btn-primary">Publicar</button>
    </div>
  </form>
</div>

@endsection