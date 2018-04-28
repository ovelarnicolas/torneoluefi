<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public $table = "imagenes";

    public $timestamps = false;

    protected $primaryKey = 'id';

    public function Gallery()
    {
        return $this->belongsTo('App\Gallery', 'categoria_id');
    }
}
