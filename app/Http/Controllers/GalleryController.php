<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

use App\Http\Requests;
use App\Gallery;
use App\Image;
use App\Division;

class GalleryController extends AuthenticateController
{

    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
        $this->middleware('jwt.auth', ['except' => ['Index', 'main', 'ImagesByGalleryId']]);
    }

    public function Index() {

        $galleries = Gallery::all();

        return $galleries;
    }

    public function ImagesByGalleryId($categoria_id) {

        $images = Image::where('categoria_id', $categoria_id)->get();

        return $images;
    }

    public function main() {

        $galleries = Gallery::all();
        $divisiones = Division::all();

        foreach ($galleries as $gallery) {
            $gallery->Images;
        }
        return view('galeria', ['divisiones' => $divisiones, 'galleries' => $galleries]);
        // return view('galeria')->with('galleries', $galleries, 'divisiones', $divisiones);
    }

    public function Create(Request $req) {

        $gallery = new Gallery;

        $gallery->nombre = $req->nombre;

        return json_encode(array(
            'success' => $gallery->save()
        ));
    }

    public function Delete($id) {

        $gallery = Gallery::find($id);

        return json_encode(array(
            'success' => $gallery->delete()
        ));
    }

    public function DeleteImage($id) {

        $image = Image::find($id);

        return json_encode(array(
            'success' => $image->delete()
        ));
    }

    public function Update($id, Request $req) {

        $gallery = Gallery::find($id);

        $gallery->nombre = $req->nombre;

        return json_encode(array(
            'success' => $gallery->save()
        ));
    }


    public function upload() {

        $file = Input::all()['file'];
        $galleryId = Input::all()['galleryid'];

        $gallery = Gallery::find($galleryId);

        if ($gallery) {

            $lastImgIdInGallery = Image::where('categoria_id', $galleryId)->get()->last();

            $gallery->nombre = str_replace(' ', '_', $gallery->nombre);

            $lastImgIdInGallery = $lastImgIdInGallery ? $lastImgIdInGallery->id : 1;

            $finalFilePath = $this->MoveImageFile($file, $gallery->nombre, $lastImgIdInGallery);
            $newImage = new Image;
            $newImage->nombre = $finalFilePath;
            $newImage->categoria_id = $galleryId;

            return json_encode(array(
                'success' => $newImage->save()
            ));

        } else {
            return json_encode(array(
                'success' => false, 'msg' => 'No se encuentra galeria con el id ' . $galleryId
            ));
        }
    }

    private function MoveImageFile($file, $galleryName, $lastImgIdInGallery) {

        $filename = $galleryName. '_' . sprintf("%08d", $lastImgIdInGallery + 1) . '.' . $file->getClientOriginalExtension();
        $destinationPath = public_path() . '/img/gallery/';
        $file->move($destinationPath, $filename);

        return $filename;
    }
}
