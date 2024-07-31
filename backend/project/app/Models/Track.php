<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'letter', 'duration', 'album_id'];

    /**
     * Faz o relacionamento com a tabela de Albuns
     */
    public function album(){
        return $this->belongsTo(Album::class);
    }
    /**
     * Converte a duração fornecida no formato MM:SS para segundos e a armazena no banco de dados.
     * @param string $value A duração no formato MM:SS, onde MM representa minutos e SS representa segundos.
     * @return void
     */
    public function setDurationAttribute($value){
        $parts = explode(':', $value);
        $minutes = isset($parts[0]) ? (int) $parts[0] : 0;
        $seconds = isset($parts[1]) ? (int) $parts[1] : 0;

        $this->attributes['duration'] = ($minutes * 60) + $seconds;
    }
     /**
     * Formata a duração em segundos para o formato MM:SS.
     * @param int $value A duração em segundos.
     * @return string A duração formatada como MM:SS.
     */    
    public function getDurationAttribute($value){
        $minutes = floor($value / 60);
        $seconds = $value % 60;
        return sprintf('%02d:%02d', $minutes, $seconds);
    }
}
