<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'partido_id';

    public function EquipoA()
    {
        return $this->hasOne('App\Equipo', 'equipo_id', 'equipo_a');
    }

    public function EquipoB()
    {
        return $this->hasOne('App\Equipo', 'equipo_id', 'equipo_b');
    }

    public function Torneo()
    {
        return $this->belongsTo('App\Torneo', 'torneo_id');
    }
}
