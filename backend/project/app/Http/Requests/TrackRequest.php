<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class TrackRequest extends FormRequest
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
            'duration' => 'required|regex:/^([0-9]{1,2}):([0-9]{2})$/',
            'album_id' => 'required|integer|exists:albums,id',
        ];
    }
    /**
     * Retorna as mensagem de validação dos campos das musicas
     * @return array
     */
    public function messages() : array{
        return [
            'name.required' => 'Nome da musica é obrigatório',
            'duration.required' => 'Duração da musica é obrigatória',
            'duration.regex' => 'A duração deve estar no formato minutos:segundos (MM:SS)',
            'album_id.required' => 'A música precisa estar em um álbum existente',
            'album_id.exists' => 'O álbum selecionado não existe',

        ];
    }
    /**
     * Lança a exceção, se por acaso aconter um erro no cadastro de novos albuns 
    */
    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
