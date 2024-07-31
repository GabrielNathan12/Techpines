<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class AlbumRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'release_date' => 'required|date'
        ];
    }
        
    /**
     * Lança a exceção, se por acaso aconter um erro no cadastro de novos albuns 
     */

    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }

     /**
     * Retorna as mensagem de validação dos campos de albuns
     * @return array
     */
    public function messages() : array{
        return [
            'name.required' => 'Nome do album é obrigatório',
            'release_date.required' => 'Data de lançamento é obrigatória',
            'release_date.date' => 'A data de lançamento deve estar no formato ano/mês/dia (YYYY/MM/DD)',

        ];
    }
}
