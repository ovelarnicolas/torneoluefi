<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    public $table = "jugadores";

    public $timestamps = false;

    protected $primaryKey = 'id';

    public function Equipo()
    {
        return $this->hasOne('App\Equipo', 'equipo_id', 'equipo_id');
    }

    public function Torneo()
    {
        return $this->hasOne('App\Torneo', 'torneo_id');
    }
}
