<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;
    
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email' . ($userId ? ',' . $userId : ''),
            'password' => 'required|string|min:8',
        ];
    }
    
    /**
     * Lança a exceção, se por acaso aconter um erro no cadastro de usuários 
     */

    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
    /**
     * Retorna as mensagem de validação dos campos de usuários
     * @return array
     */
    public function messages() : array{
        return [
            'name.required' => 'Nome é obrigatório',
            'email.required' => 'Email é obrigatório',
            'password.required' => 'Senha é obrigatória',
            'password.min' => 'Senha precisa de pelo menos 8 caracteres',
            'email.email' => 'Envie um email válido',
            'email.unique' => 'Email já cadastrado',
        ];
    }
    
}
