<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id';

    public function Division()
    {
        return $this->belongsTo('App\Division', 'division_id');
    }

    public Function Torneos()
    {
        return $this->hasMany('App\Torneo', 'zona_id');
    }

}
