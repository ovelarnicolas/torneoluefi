<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    public $table = "divisiones";

    public $timestamps = false;

    protected $primaryKey = 'id';

    public Function Zonas()
    {
        return $this->hasMany('App\Zona', 'division_id');
    }
}
