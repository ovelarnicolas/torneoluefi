<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posicion extends Model
{
    public $table = "datos_equipos_torneo";

    public $timestamps = false;

    protected $primaryKey = 'id';

    public function Equipo()
    {
        return $this->belongsTo('App\Equipo', 'equipo_id');
    }

    public function Torneo()
    {
        return $this->belongsTo('App\Torneo', 'torneo_id');
    }

    public function Zona()
    {
        return $this->hasOne('App\Zona', 'zona_id');
    }

    public function Division()
    {
        return $this->hasOne('App\Division', 'division_id');
    }
}
