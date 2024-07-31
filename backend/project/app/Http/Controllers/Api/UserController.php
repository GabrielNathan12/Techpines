<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Retorna um Json de todos os usuários cadastrados.
     * @return Illuminate\Http\JsonResponse
     */

    public function index() : JsonResponse {
        $users = User::orderBy('id', 'DESC')->get();

        return response()->json($users);
    }
    /**
     * Retorna apenas um unico usuário
     * @param App\Models\User;
     * @return Illuminate\Http\JsonResponse
     */

    public function show(User $user) : JsonResponse {
        return response()->json($user);
    }
    /**
     * Cadastrar apenas um unico usuário
     * @param App\Models\User;
     * @return Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request) : JsonResponse{
            
        $user = [
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ];

        $newUser = User::create($user);

        return response()->json($newUser, 201);
    }

    /**
     * Atualizar apenas um unico usuário pelo ID passado por parametro na Url
     * @param App\Models\User;
     * @return Illuminate\Http\JsonResponse
     */

    public function update(UserRequest $request, User $user) : JsonResponse {
        $user->update($request->all());
        
        return response()->json(
            $user
        );
    }
    /**
     * Remove um usuário.
     * 
     * @param User $user
     * @return JsonResponse
     */
    public function destroy(User $user) : JsonResponse {
        $user->delete();

        return response()->json([
            'mensagem' => 'Usuário deletado'
        ], 200);
    }

}
