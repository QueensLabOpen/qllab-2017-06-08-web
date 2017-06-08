@extends('layouts.app')

@section('content')
    <app></app>
    @javascript([
        'csrfToken' => csrf_token(),
        'authCheck' => Auth::check()
    ])
@endsection
