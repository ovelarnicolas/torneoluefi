@extends('layouts.master')

@section('title')
Inicio - LUEFI 2016
@endsection

@section('siteheading')

<img src="{{ asset('img/Utils/luefi_logo.png') }}" alt="">
<hr class="small">
<span class="subheading">Liga Unificada de Escuelas de Fútbol Infantil</span>
</div>

@endsection

@section('content')

<div class="slider-container" style="height: 330px;">
    <div style="height: 330px;" ng-controller="NoticiasController">
        <uib-carousel style="height: 330px;" active="0" interval="3000" no-wrap="false">
            <uib-slide style="height: 330px;" ng-repeat="slide in sliderPhotos track by slide.sliderPosition" index="slide.sliderPosition">
                <img style="height: 330px; width:100%;" ng-src="img/gallery/@{{ slide.nombre }}">
            </uib-slide>
        </uib-carousel>
    </div>
</div>
<div class="row">
    <div class="col-lg-10 col-md-10 col-lg-offset-1">
        <div class="post-preview">
            <hr>
            <h2 class="post-title">
                Noticias de la semana
            </h2>

            @if(count($noticias))

            @foreach($noticias as $noticia)
            <h3 class="post-subtitle">
                <a href="post.html">
                    {{ $noticia->titulo }}
                </a>
            </h3>
            <p class="post-meta">{{ $noticia->subtitulo }}</p>
            <p>
                {{ $noticia->mensaje }}
                <hr>
                @endforeach

                @endif
            </p>
        </div>
        @if(count($equipos))

        @foreach($equipos as $equipo)

        @if ($equipo->escudo !== '')
        <img ng-src="../../img/escudos/{{ $equipo->escudo }}"  width="90" height="90">
        @endif

        @endforeach

        @endif

    </div>
</div>

@endsection
