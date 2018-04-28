<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Division;

class DivisionController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index', 'main']]);
    }

    public function index() {

        $divisiones = Division::all();

        return $divisiones;
    }


    public function main($divisionid) {

        $divisiones = Division::all();

        foreach ($divisiones as $division) {
            $division->Zonas;
            foreach ($division->Zonas as $zona) {
                $zona->Torneos;
            }
        }

        return View('posiciones', ['divisionid' => $divisionid, 'divisiones' => $divisiones]);
    }

}
