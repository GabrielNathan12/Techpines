import Api from '../../services/api'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { Alert } from '@mui/material'
import { FaEdit } from "react-icons/fa"
import { AiTwotoneDelete } from "react-icons/ai"
import "./Tracks.css"
import Navbar from '../navbar/Navbar'

Modal.setAppElement('#root')

export const TrackDetail = () => {
    const { id: trackId } = useParams()
    const navigate = useNavigate()
    const [track, setTrack] = useState(null)
    const { fetchByTracks, updateTrack, deleteTrack } = Api()
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(null)
    const [editMinutes, setEditMinutes] = useState('')
    const [editSeconds, setEditSeconds] = useState('')

    useEffect(() => {
        const fetchTrack = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                return navigate('/')
            }

            try {
                const response = await fetchByTracks(token, trackId);
                setTrack(response.data)
            } catch (error) {
                console.error('Erro ao buscar a música:', error)
                if (error.response && error.response.status === 401) {
                    navigate('/')
                }
            }
        };
        fetchTrack()
    }, []);

    const handleUpdateTrack = async (event) => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        const formattedDuration = formatDuration(editMinutes, editSeconds)

        try {
            await updateTrack(token, currentTrack.id, currentTrack.name, currentTrack.letter, formattedDuration, currentTrack.album_id)
            const response = await fetchByTracks(token, trackId)
            setTrack(response.data)

            setEditModalOpen(false)
            setSuccessMessage("Música atualizada com sucesso")
            setErrorMessage("")
        } catch (error) {
            setErrorMessage('Erro ao atualizar a música, por favor tente novamente.')
            setSuccessMessage('')
        }
    };

    const handleDeleteTrack = async () => {
        const token = localStorage.getItem('token')

        try {
            await deleteTrack(token, track.id)

            setSuccessMessage('Música deletada com sucesso')
            setErrorMessage('')
            navigate('/dashboard')
        } catch (error) {
            setErrorMessage('Não foi possível deletar a música.')
            setSuccessMessage('')
        }
    };

    const handleEdit = () => {
        setCurrentTrack(track)
        const [mins, secs] = track.duration.split(':')
        setEditMinutes(mins)
        setEditSeconds(secs)
        setEditModalOpen(true)
    };

    const formatDuration = (minutes, seconds) => {
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(seconds).padStart(2, '0')
        return `${formattedMinutes}:${formattedSeconds}`
    };

    return (
        <div>
            <Navbar/>
            <div className="track-detail-container">
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {track && (
                    <div className="track-detail">
                        <h1>{track.name}</h1>
                        <p>Duração: {track.duration}</p>
                        <p className="text-display">Letra: {track.letter}</p>
                        <div>
                            <FaEdit className="icon edit" onClick={handleEdit} />
                            <AiTwotoneDelete className="icon delete" onClick={handleDeleteTrack} />
                        </div>
                    </div>
                )}
                <Modal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} contentLabel="Editar Música" className="modal" overlayClassName="modal-overlay">
                    <h2>Editar música</h2>
                    {currentTrack && (
                        <form onSubmit={handleUpdateTrack}>
                            <label>
                                Nome da música:
                                <input type="text" value={currentTrack.name} onChange={(e) => setCurrentTrack({ ...currentTrack, name: e.target.value })} required />
                            </label>
                            <label>
                                Minutos:
                                <input type="number" value={editMinutes} min={0} max={60} onChange={(e) => setEditMinutes(e.target.value)} required />
                            </label>
                            <label>
                                Segundos:
                                <input type="number" value={editSeconds} min={0} max={60} onChange={(e) => setEditSeconds(e.target.value)} required />
                            </label>
                            <label>
                                Letra:
                                <textarea className="modal-textarea" value={currentTrack.letter} onChange={(e) => setCurrentTrack({ ...currentTrack, letter: e.target.value })} />
                            </label>
                            <button type="submit">Atualizar Música</button>
                            <button type="button" onClick={() => setEditModalOpen(false)}>Cancelar</button>
                        </form>
                    )}
                </Modal>

            </div>
        </div>
    );
};
