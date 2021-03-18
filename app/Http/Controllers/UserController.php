<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    public function index(){
        /*return response(User::all(), 200);*/
        return User::all();
    }
    public function show($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function store(Request $request)
    {
        $user = User::create($request->all());

        return response()->json($user, 201);
    }
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());

        return response()->json($user, 200);
    }

    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
