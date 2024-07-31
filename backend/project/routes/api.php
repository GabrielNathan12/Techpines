<?php

use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\TrackController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\Api\LoginController;
use Illuminate\Support\Facades\Route;



Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/users', [UserController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::post('/logout/{user}', [LoginController:: class, 'logout']);
    // CRUD de usuários
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    // CRUD de Album
    Route::get('/albuns', [AlbumController::class, 'index']);
    Route::put('/albuns/{album}', [AlbumController::class, 'update']);
    Route::post('/albuns', [AlbumController::class, 'store']);
    Route::get('/albuns/{album}', [AlbumController::class, 'show']);
    Route::delete('/albuns/{album}', [AlbumController::class, 'destroy']);
    // CRUD de musicas
    Route::post('/tracks', [TrackController::class, 'store']);
    Route::get('/tracks', [TrackController::class, 'index']);
    Route::put('/tracks/{track}', [TrackController::class, 'update']);
    Route::get('/tracks/{track}', [TrackController::class, 'show']);
    Route::delete('/tracks/{track}', [TrackController::class, 'destroy']);
});