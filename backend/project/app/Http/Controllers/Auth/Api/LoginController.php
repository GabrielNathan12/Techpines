<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Login do usuário
     * @param email,password
     * E retorna o token de autenticação
     * @return token
     */
    public function login(Request $request): JsonResponse{
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $token = $request->user()->createToken('api')->plainTextToken;

            return response()->json([
                'token' => $token,
                'email' => $request->email
            ], 200);
        }
        else{
            return response()->json([
                'error' => 'Credenciais Inválidas'
            ], 400);
        }
    }

    public function logout(User $user): JsonResponse{

        try{
            $user->tokens()->delete();
            return response()->json([
                'mensagem' => 'Usuário deslogado',
            ], 200);

        }catch(Exception $e){
            return response()->json([
                'error' => 'Não foi possível deslogar',
                'mensagem' => $e
            ], 400);
        }
    }
}
