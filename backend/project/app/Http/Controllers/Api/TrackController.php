<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TrackRequest;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TrackController extends Controller
{
    /**
     * Retorna um Json de todos os albuns cadastrados.
     * @return Illuminate\Http\JsonResponse
    */

     public function index() : JsonResponse {
        $tracks = Track::orderBy('id', 'DESC')->get();

        return response()->json($tracks);
    }
    /**
     * Retorna apenas um unico usuário
     * @param App\Models\Track;
     * @return Illuminate\Http\JsonResponse
     */
    public function show(Track $track) : JsonResponse {
        return response()->json($track);
    }

    /**
     * Cadastrar apenas uma unica musica
     * @param App\Models\Track;
     * @return Illuminate\Http\JsonResponse
     */

    public function store(TrackRequest $request) : JsonResponse{
            
        $track = [
            "name" => $request->name,
            "letter" => $request->letter,
            "duration" => $request->duration,
            "album_id" => $request->album_id,
        ];

        $newTrack = Track::create($track);

        return response()->json($newTrack, 201);
    }
    /**
     * Atualizar apenas uma musica pelo ID passado por parametro na Url
     * @param App\Models\Track;
     * @return Illuminate\Http\JsonResponse
    */
    public function update(TrackRequest $request, Track $track) : JsonResponse {
        $track->update($request->all());

        return response()->json(
            $track
        );
    }
    /**
     * Remove uma musica.
     * 
     * @param Track
     * @return JsonResponse
     */
    public function destroy(Track $track) : JsonResponse {
        $track->delete();

        return response()->json([
            'mensagem' => 'Musica deletada'
        ], 200);
    }

}
