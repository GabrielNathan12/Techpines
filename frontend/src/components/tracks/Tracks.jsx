import { useEffect, useState } from "react";
import Api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Alert } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
import Modal from 'react-modal';
import "./Tracks.css"

Modal.setAppElement('#root');

export const Tracks = () => {
    const navigate = useNavigate()
    const { id: albumId } = useParams()
    const [name, setName] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')
    const [letter, setLetter] = useState('')
    const [tracks, setTracks] = useState([])
    const { fetchAllTracks, addTrack, updateTrack, deleteTrack } = Api()
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(null)
    const [editMinutes, setEditMinutes] = useState('')
    const [editSeconds, setEditSeconds] = useState('')

    useEffect(() => {
        const fetchAll = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                return navigate('/')
            }

            try {
                const response = await fetchAllTracks(token)
                const filtered = response.data.filter(track => track.album_id === parseInt(albumId))
                setTracks(filtered)
            } catch (error) {
                console.error('Erro ao buscar as músicas:', error)
                if (error.response && error.response.status === 401) {
                    navigate('/')
                }
            }
        };
        fetchAll()
    }, [])

    const handleAddTracks = async (event) => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        const duration = formatDuration(minutes, seconds)

        try {
            await addTrack(token, name, letter, duration, albumId)
            const response = await fetchAllTracks(token)
            const filtered = response.data.filter(track => track.album_id === parseInt(albumId))
            setTracks(filtered)

            setModalOpen(false)
            setSuccessMessage("Música adicionada com sucesso")
            setErrorMessage("")
            setName("")
            setMinutes("")
            setSeconds("")
            setLetter("")

        } catch (error) {
            setErrorMessage('Por favor, verifique os campos e tente novamente.')
            setSuccessMessage('')
        }
    };

    const handleUpdateTrack = async (event) => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        const formattedDuration = formatDuration(editMinutes, editSeconds)

        try {
            await updateTrack(token, currentTrack.id, currentTrack.name, currentTrack.letter, formattedDuration, albumId)
            const response = await fetchAllTracks(token)
            const filtered = response.data.filter(track => track.album_id === parseInt(albumId))
            
            setTracks(filtered)
            setEditModalOpen(false)
            setSuccessMessage("Música atualizada com sucesso")
            setErrorMessage("")
        } catch (error) {
            setErrorMessage('Erro ao atualizar a música, por favor tente novamente.')
            setSuccessMessage('')
        }
    }

    const handleDeleteTrack = async (track) =>{
        const token = localStorage.getItem('token')

        try {
            await deleteTrack(token, track)

            const response = await fetchAllTracks(token)
            const filtered = response.data.filter(track => track.album_id === parseInt(albumId));
            setTracks(filtered);

            setSuccessMessage('Álbum deletado com sucesso')
            setErrorMessage('')
        } catch (error) {
            setErrorMessage('Não foi possível deletar o álbum.');
            setSuccessMessage('')
        }
    }
    const handleEdit = (track) => {
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
        <div className="tracks-container">
            <div className="title-and-add-button">
                <h1>Músicas</h1>
                <div className="add-tracks-card" onClick={() => setModalOpen(true)}>
                    <IoMdAddCircle className="add-icon" />
                </div>
            </div>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <div className="track-list-container">
                <div className="track-list">
                    <ul>
                        {tracks.map(track => (
                            <li key={track.id}>
                                <div className="track-details">
                                    <span>{track.name} - {track.duration}</span>
                                </div>
                                <div>
                                    <FaEdit className="icon edit" onClick={() => handleEdit(track)} />
                                    <AiTwotoneDelete className="icon delete" onClick={() => handleDeleteTrack(track.id)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Adicionar uma nova música" className="modal" overlayClassName="modal-overlay">
                <h2>Adicionar uma nova música</h2>
                <form onSubmit={handleAddTracks}>
                    <label>
                        Nome da música:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Minutos:
                        <input type="number" value={minutes} min={0} max={60} onChange={(e) => setMinutes(e.target.value)} required />
                    </label>
                    <label>
                        Segundos:
                        <input type="number" value={seconds} min={0} max={60} onChange={(e) => setSeconds(e.target.value)} required />
                    </label>
                    <label>
                        Letra:
                        <textarea className="modal-textarea" value={letter} onChange={(e) => setLetter(e.target.value)} />
                    </label>
                    <button type="submit">Adicionar Música</button>
                    <button type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                </form>
            </Modal>
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
    );
}
