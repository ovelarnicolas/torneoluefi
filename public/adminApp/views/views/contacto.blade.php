@extends('layouts.master')

@section('title')
Contacto
@endsection

@section('content')

<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <h2 class="post-title">
                Contacto
            </h2>
            <p>Si tiene alguna duda o quiere participar del Torneo no dude en contactarnos:</p>
            <form name="sentMessage" id="contactForm" novalidate>
                <div class="row control-group">
                    <div class="form-group col-xs-12 floating-label-form-group controls">
                        <label>Nombre</label>
                        <input type="text" class="form-control" placeholder="Nombre" id="nombre" required data-validation-required-message="Por favor ingrese su nombre.">
                        <p class="help-block text-danger"></p>
                    </div>
                </div>
                <div class="row control-group">
                    <div class="form-group col-xs-12 floating-label-form-group controls">
                        <label>Email</label>
                        <input type="email" class="form-control" placeholder="correo@email.com" id="email" required data-validation-required-message="Por favor ingrese su dirección de correo.">
                        <p class="help-block text-danger"></p>
                    </div>
                </div>
                <div class="row control-group">
                    <div class="form-group col-xs-12 floating-label-form-group controls">
                        <label>Club</label>
                        <input type="tel" class="form-control" placeholder="Club" id="club" required data-validation-required-message="Por favor ingrese su Club.">
                        <p class="help-block text-danger"></p>
                    </div>
                </div>
                <div class="row control-group">
                    <div class="form-group col-xs-12 floating-label-form-group controls">
                        <label>Message</label>
                        <textarea rows="5" class="form-control" placeholder="Mensaje" id="mensaje" required data-validation-required-message="Por favor ingrese un mensaje."></textarea>
                        <p class="help-block text-danger"></p>
                    </div>
                </div>
                <br>
                <div id="success"></div>
                <div class="row">
                    <div class="form-group col-xs-12">
                        <button type="submit" class="btn btn-default">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<hr>

@endsection
