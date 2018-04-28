<script type="text/javascript">
    var _divisiones = "{{ $divisiones }}";
    _divisiones = _divisiones.replace(/&quot;/g,'\"');
    var _selectedDivision = {{ $divisionid }}
</script>

@extends('layouts.master')

@section('title')
Fixture
@endsection

@section('content')

<div ng-controller="PartidosController">

    <select style="display:none;" class="form-control"  name="division" id="division" ng-model="selectedDivision"
    ng-options="division.id as division.nombre for division in divisiones | filter: { id: selectedDivision }">
        <option value="">Seleccione... </option>
    </select>
    <br>
    <label for="zona-division">Zona:</label>
    <select class="form-control" name="zona" id="zona" ng-model="selectedZona" ng-options="zona as zona.nombre for zona in selectedDivision2.zonas">
        <option value="">Seleccione... </option>
    </select>
    <br>
    <label for="zona-division">Categoria:</label>
    <select class="form-control" name="categoria" id="categoria" ng-model="selectedCategoria" ng-options="categoria as categoria.nombre_torneo for categoria in selectedZona.torneos">
        <option value="">Seleccione... </option>
    </select>

    <br>

    <div ng-repeat="(key, value) in partidos | groupBy: 'fecha'">
        Fecha @{{ key }}
        <table class="table table-striped">
            <thead>
                <tr>
                    <th st-sort="equipo_a.nombre">Equipo</th>
                    <th st-sort="goles_a">Resultado</th>
                    <th st-sort="equipo_b.nombre">Equipo</th>
                    <th st-sort="dia">Día</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="row in value">
                    <td>@{{row.equipo_a.nombre}}</td>
                    <td>@{{row.goles_a}} - @{{row.goles_b}}</td>
                    <td>@{{row.equipo_b.nombre}}</td>
                    <td>@{{row.dia}}</td>
                </tr>
            </tbody>
        </table>
    </div>


</div>

<!-- {{ $divisiones }} -->

</div>

@endsection
