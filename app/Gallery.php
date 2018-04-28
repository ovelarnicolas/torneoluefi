<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    public $table = "imagenes_categorias";

    public $timestamps = false;

    protected $primaryKey = 'id';

    public Function Images()
    {
        return $this->hasMany('App\Image', 'categoria_id');
    }
}
