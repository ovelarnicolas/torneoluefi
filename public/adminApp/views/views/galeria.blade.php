@extends('layouts.master')

@section('title')
Galeria
@endsection

@section('content')

<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div class="post-preview">
                <h2 class="post-title">
                    Galería Torneo LUEFI 2017
                </h2>

                @if(count($galleries))

                @foreach($galleries as $gallery)

                @if($gallery->id != 1)
                <hr>
                <h4>{{ $gallery->nombre }}</h4>

                @foreach($gallery->Images as $image)

                <a class="fancybox" rel="gallery1" href="img/gallery/{{ $image->nombre }}">
                    <img style="height:160px; width:240px;padding-top: 5px;"src="img/gallery/{{ $image->nombre }}" alt="" />
                </a>

                @endforeach

                @endif

                @endforeach

                @endif
            </div>
        </div>
    </div>
</div>

@endsection

@section('footer')
<script type="text/javascript">
$(document).ready(function() {
    $("a.fancybox").fancybox({
        'transitionIn'	:	'elastic',
        'transitionOut'	:	'elastic',
        'speedIn'		:	600,
        'speedOut'		:	200,
        'overlayShow'	:	false
    });
});
</script>
@endsection
