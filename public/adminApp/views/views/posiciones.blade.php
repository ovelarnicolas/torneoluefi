<script type="text/javascript">
var _divisiones = "{{ $divisiones }}";
_divisiones = _divisiones.replace(/&quot;/g,'\"');
var _selectedDivision = {{ $divisionid }}
</script>

@extends('layouts.master')

@section('title')
Tabla de Posiciones
@endsection

@section('content')

<div class="col-lg-12" ng-controller="PositionController">
    <div class="row">
        <div class="col-lg-6">
            <label for="zona-division">Zona:</label>
            <select class="form-control" name="zona" id="zona" ng-model="selectedZona" ng-options="zona as zona.nombre for zona in selectedDivision2.zonas">
                <option value="">Seleccione... </option>
            </select>
        </div>
        <div class="col-lg-6">
            <label for="zona-division">Categoria:</label>
            <select  class="form-control" name="categoria" id="categoria" ng-model="selectedCategoria" ng-options="categoria as categoria.nombre_torneo for categoria in selectedZona.torneos">
                <option value="">Seleccione... </option>
            </select>
        </div>
    </div>
    <select style="display:none;" class="form-control"  name="division" id="division" ng-model="selectedDivision"
    ng-options="division.id as division.nombre for division in divisiones | filter: { id: selectedDivision }">
    <option value="">Seleccione... </option>
</select>

<table class="table-responsive">
    <table ng-show="selectedCategoria" class="table table-striped">
        <thead>
            <tr>
                <th>N°</th>
                <th></th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>PTS</th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="row in posiciones | orderBy : 'puntos*1':true">
                <td>@{{$index + 1}}</td>
                <td><img ng-src="../../img/escudos/@{{row.equipo.escudo}}"  width="40" height="40"></td>
                <td>@{{row.equipo.nombre}}</td>
                <td>@{{row.partidos_jugados}}</td>
                <td>@{{row.puntos}}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
</table>

</div>

<!-- {{ $divisiones }} -->

</div>

@endsection
