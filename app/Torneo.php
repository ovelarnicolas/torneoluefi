<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'torneo_id';

    public function Zona()
    {
        return $this->belongsTo('App\Zona', 'zona_id');
    }

    public function Division()
    {
        return $this->belongsTo('App\Division', 'division_id');
    }
}
