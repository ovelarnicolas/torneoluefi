<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Equipo;

use Illuminate\Support\Facades\Input;

class EquipoController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index']]);
    }

    public function index() {

        $equipos = Equipo::all();

        return $equipos;
    }

    public function Create(Request $req) {

        $equipo = new Equipo;

        $equipo->nombre = $req->nombre;
        $equipo->escudo = $req->escudo;

        return json_encode(array(
            'success' => $equipo->save()
        ));
    }

    public function Delete($id) {

        $equipo = Equipo::find($id);

        return json_encode(array(
            'success' => $equipo->delete()
        ));
    }

    public function Update($id, Request $req) {

        $equipo = Equipo::find($id);

        $equipo->nombre = $req->nombre;
        $equipo->escudo = $req->escudo;

        return json_encode(array(
            'success' => $equipo->save()
        ));
    }

    public function UploadEscudo() {

        $file = Input::all()['file'];
        $equipoid = Input::get('equipoid');
        $equiponame = Input::get('equipo');

        if ($equiponame && $file) {

            if (!$equipoid) {
                $equipoid = Equipo::max('equipo_id');
                $equipoid += 1;
            }

            $equiponame = str_replace(' ', '_', $equiponame);

            $filename = $equiponame . '_' . $equipoid . '.' . $file->getClientOriginalExtension();

            $destinationPath = public_path() . '/img/escudos/';

            $file->move($destinationPath, $filename);

            return json_encode(array(
                'image' => $filename
            ));

        } else {
            return json_encode(array(
                'success' => false, 'msg' => 'Ocurrio un error al subir la imagen: faltan parametros'
            ));
        }
    }
}
