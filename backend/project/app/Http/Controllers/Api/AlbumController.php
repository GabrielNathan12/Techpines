<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AlbumRequest;
use App\Models\Album;
use Illuminate\Http\JsonResponse;

class AlbumController extends Controller
{
    /**
     * Retorna um Json de todos os albuns cadastrados.
     * @return Illuminate\Http\JsonResponse
     */

    public function index() : JsonResponse {
        $albuns = Album::orderBy('id', 'DESC')->get();

        return response()->json($albuns);
    }
    /**
     * Retorna apenas um unico usuário
     * @param App\Models\Album;
     * @return Illuminate\Http\JsonResponse
     */
    public function show(Album $album) : JsonResponse {
        return response()->json($album);
    }

    /**
     * Cadastrar apenas um unico Album
     * @param App\Models\Album;
     * @return Illuminate\Http\JsonResponse
     */

    public function store(AlbumRequest $request) : JsonResponse{
            
        $album = [
            "name" => $request->name,
            "release_date" => $request->release_date,
        ];

        $newAlbum = Album::create($album);

        return response()->json($newAlbum, 201);
    }
    /**
     * Atualizar apenas um unico album pelo ID passado por parametro na Url
     * @param App\Models\Album;
     * @return Illuminate\Http\JsonResponse
    */
    public function update(AlbumRequest $request, Album $album) : JsonResponse {
        $album->update($request->all());

        return response()->json(
            $album
        );
    }

    /**
     * Remove um album.
     * 
     * @param Album $album
     * @return JsonResponse
     */
    public function destroy(Album $album) : JsonResponse {
        $album->delete();

        return response()->json([
            'mensagem' => 'Album deletado'
        ], 200);
    }

}
