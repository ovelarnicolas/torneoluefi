<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Torneo;

class TorneoController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index']]);
    }

    public function index() {

        $torneos = Torneo::all();

        foreach ($torneos as $torneo) {
            if ($torneo->Zona) {            
                $torneo->Zona->Division;
            }
        }

        return $torneos;
    }

    public function Create(Request $req) {

        $torneo = new Torneo;

        $torneo->nombre_torneo = $req->nombre_torneo;
        $torneo->zona_id = $req->zona_id;

        return json_encode(array(
            'success' => $torneo->save()
        ));
    }

    public function Delete($id) {

        $torneo = Torneo::find($id);

        return json_encode(array(
            'success' => $torneo->delete()
        ));
    }

    public function Update($id, Request $req) {

        $torneo = Torneo::find($id);

        $torneo->nombre_torneo = $req->nombre_torneo;
        $torneo->zona_id = $req->zona_id;

        return json_encode(array(
            'success' => $torneo->save()
        ));
    }
}
