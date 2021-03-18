<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

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

/*Route::get('usuarios', function(){
    return User::all();
});
Route::get('usuarios/{id}', function(){
    return User::find($id);
});
Route::post('usuarios', function(Request $request){
    return User::create($request->all());
});
Route::put('usuarios/{id}', function(Request $request, $id) {
    $user = User::findOrFail($id);
    $user->update($request->all());

    return $user;
});
Route::delete('usuarios/{id}', function($id) {
    User::find($id)->delete();

    return 204;
});*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('usuarios', 'App\Http\Controllers\UserController@index');
Route::get('usuarios/{id}', 'App\Http\Controllers\UserController@show');
Route::post('usuarios', 'App\Http\Controllers\UserController@store');
Route::put('usuarios/{id}', 'App\Http\Controllers\UserController@update');
Route::delete('usuarios/{id}', 'App\Http\Controllers\UserController@delete');
