<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\noticia;
use App\Division;
use App\Zona;
use App\Equipo;

class NoticiaController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['index', 'main']]);
    }

    public function main() {

        $noticias = Noticia::all();

        $divisiones = Division::all();

        $equipos = Equipo::all();

        foreach ($divisiones as $division) {
            $division->Zonas;
        }

        return view('main', ['noticias' => $noticias, 'divisiones' => $divisiones, 'equipos' => $equipos]);
    }

    public function index() {

        $noticias = Noticia::all();

        return $noticias;
    }

    public function Create(Request $req) {

        $Noticia = new Noticia;

        $Noticia->titulo = $req->titulo;
        $Noticia->mensaje = $req->mensaje;
        $Noticia->subtitulo = $req->subtitulo;

        return json_encode(array(
            'success' => $Noticia->save()
        ));
    }

    public function Delete($id) {

        $Noticia = Noticia::find($id);

        return json_encode(array(
            'success' => $Noticia->delete()
        ));
    }

    public function Update($id, Request $req) {

        $Noticia = Noticia::find($id);

        $Noticia->titulo = $req->titulo;
        $Noticia->mensaje = $req->mensaje;
        $Noticia->subtitulo = $req->subtitulo;

        return json_encode(array(
            'success' => $Noticia->save()
        ));
    }
}
