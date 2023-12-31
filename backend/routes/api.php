<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/articles', [PostsController::class, 'index']);
Route::get('/articles/{limit}/{offset}', [PostsController::class, 'getPaginatedArticles']);
Route::get('/articles/{id}', [PostsController::class, 'show']);
Route::post('/articles', [PostsController::class, 'store']);
Route::put('/articles/{id}', [PostsController::class, 'update']);
Route::delete('/articles/{id}', [PostsController::class, 'destroy']);
