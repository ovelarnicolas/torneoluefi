<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Partido;
use App\Division;

class PartidoController extends Controller
{
    public function index(Request $request) {

        $torneo = $request->input('torneo');

        if ($torneo) {
            $partidos = Partido::where('torneo_id', $torneo)->get();
        } else {
            $partidos = Partido::all();
        }

        foreach ($partidos as $partido) {
            $partido->EquipoA;
            $partido->EquipoB;
            $partido->Torneo;
        }



        return $partidos;
    }

    public function main($divisionid) {
        $divisiones = Division::all();

        foreach ($divisiones as $division) {
            $division->Zonas;
            foreach ($division->Zonas as $zona) {
                $zona->Torneos;
            }
        }

        return View('partidos', ['divisionid' => $divisionid, 'divisiones' => $divisiones]);
    }

    public function ByCategory($categoryid) {

        $partidos = Partido::where('torneo_id', $categoryid)->get();

        foreach ($partidos as $partido) {
            $partido->EquipoA;
            $partido->EquipoB;
            $partido->Torneo;
        }

        // echo json_encode($partidos);

        return $partidos;
    }

    public function Create(Request $req) {

        $partido = new Partido;

        $partido->dia = $req->dia;
        $partido->fecha = $req->fecha;
        $partido->goles_a = $req->goles_a;
        $partido->goles_b = $req->goles_b;
        $partido->equipo_a = $req->equipo_a;
        $partido->equipo_b = $req->equipo_b;
        $partido->torneo_id = $req->torneo_id;

        return json_encode(array(
            'success' => $partido->save()
        ));
    }

    public function Delete($id) {

        $partido = Partido::find($id);

        return json_encode(array(
            'success' => $partido->delete()
        ));
    }

    public function Update($id, Request $req) {

        $partido = Partido::find($id);

        $partido->dia = $req->dia;
        $partido->fecha = $req->fecha;
        $partido->goles_a = $req->goles_a;
        $partido->goles_b = $req->goles_b;
        $partido->equipo_a = $req->equipo_a;
        $partido->equipo_b = $req->equipo_b;
        $partido->torneo_id = $req->torneo_id;

        return json_encode(array(
            'success' => $partido->save()
        ));
    }
}
