<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Jugador;
use App\Http\Controllers\Input;

class JugadorController extends Controller
{

    public function index(Request $request) {

        $torneo = $request->input('torneo');
        $equipo = $request->input('equipo');
        $Jugadores = [];

        if($torneo != null & $equipo != null){
            $Jugadores = Jugador::where('torneo_id', $torneo)->where('equipo_id', $equipo)->get();
        } else {
             $Jugadores = Jugador::all();
        }

        foreach ($Jugadores as $jugador) {
            $jugador->Torneo->Zona;
            $jugador->Equipo;
        }

        return $Jugadores;
    }

    public function Create(Request $req) {

        $Jugadores = new Jugador;

        $Jugadores->nombre = $req->nombre;
        $Jugadores->apellido = $req->apellido;
        $Jugadores->dni = $req->dni;
        $Jugadores->fecha_nacimiento = $req->fecha_nacimiento;
        $Jugadores->equipo_id = $req->equipo_id;
        $Jugadores->torneo_id = $req->torneo_id;

        return json_encode(array(
            'success' => $Jugadores->save()
        ));
    }

    public function Delete($id) {

        $Jugadores = Jugador::find($id);

        return json_encode(array(
            'success' => $Jugadores->delete()
        ));
    }

    public function Update($id, Request $req) {

        $Jugadores = Jugador::find($id);

        $Jugadores->nombre = $req->nombre;
        $Jugadores->apellido = $req->apellido;
        $Jugadores->dni = $req->dni;
        $Jugadores->fecha_nacimiento = $req->fecha_nacimiento;
        $Jugadores->equipo_id = $req->equipo_id;
        $Jugadores->torneo_id = $req->torneo_id;

        return json_encode(array(
            'success' => $Jugadores->save()
        ));
    }
}
