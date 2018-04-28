<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Zona;

class ZonaController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index']]);
    }

    public function index() {

        $Zonas = Zona::all();

        foreach ($Zonas as $zona) {
            $zona->Division;
        }

        return $Zonas;
    }

    public function Create(Request $req) {

        $Zona = new Zona;

        $Zona->nombre = $req->nombre;
        $Zona->division_id = $req->division_id;

        return json_encode(array(
            'success' => $Zona->save()
        ));
    }

    public function Delete($id) {

        $Zona = Zona::find($id);

        return json_encode(array(
            'success' => $Zona->delete()
        ));
    }

    public function Update($id, Request $req) {

        $Zona = Zona::find($id);

        $Zona->nombre = $req->nombre;
        $Zona->division_id = $req->division_id;

        return json_encode(array(
            'success' => $Zona->save()
        ));
    }
}
