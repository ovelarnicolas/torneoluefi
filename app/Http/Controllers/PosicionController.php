<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Posicion;

class PosicionController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index', 'main', 'ByCategory']]);
    }

    public function index() {

        $posiciones = Posicion::all();

        foreach ($posiciones as $posicion) {
            $posicion->Equipo;
            if ($posicion->Torneo) {
                if ($posicion->Torneo->Zona) {
                    $posicion->Torneo->Zona->Division;
                }
            }
        }

        return $posiciones;
    }

    public function ByCategory($categoryid) {

        $posiciones = Posicion::where('torneo_id', $categoryid)->get();

        foreach ($posiciones as $posicion) {
            $posicion->Equipo;
            $posicion->Torneo;
        }

        return $posiciones;
    }


    public function Create(Request $req) {

        $posicion = new Posicion;

        $posicion->equipo_id = $req->equipo_id;
        $posicion->torneo_id = $req->torneo_id;
        $posicion->partidos_jugados = $req->partidos_jugados;
        $posicion->puntos = $req->puntos;

        return json_encode(array(
            'success' => $posicion->save()
        ));
    }

    public function Delete($id) {

        $posicion = Posicion::find($id);

        return json_encode(array(
            'success' => $posicion->delete()
        ));
    }

    public function Update($id, Request $req) {

        $posicion = Posicion::find($id);

        $posicion->equipo_id = $req->equipo_id;
        $posicion->torneo_id = $req->torneo_id;
        $posicion->partidos_jugados = $req->partidos_jugados;
        $posicion->puntos = $req->puntos;

        return json_encode(array(
            'success' => $posicion->save()
        ));
    }
}
