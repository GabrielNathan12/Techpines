import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { Alert } from '@mui/material'
import { FaEdit } from "react-icons/fa"
import { AiTwotoneDelete } from "react-icons/ai"
import Api from '../../services/api'
import "./AlbumDetail.css"
import Navbar from '../navbar/Navbar'
import { Link } from "react-router-dom";

Modal.setAppElement('#root')

export const AlbumDetail = () => {
    const { id: albumId } = useParams()
    const navigate = useNavigate()
    const [album, setAlbum] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [editReleaseDate, setEditReleaseDate] = useState('')

    const { fetchByAlbum, updateAlbum, deleteAlbum } = Api()

    useEffect(() => {
        const fetchAlbum = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return navigate('/')
            }

            try {
                const response = await fetchByAlbum(token, albumId)
                setAlbum(response.data)
            } catch (error) {
                console.error('Erro ao buscar o álbum:', error)
                if (error.response && error.response.status === 401) {
                    navigate('/')
                }
            }
        };
        fetchAlbum()
    }, []);

    const handleUpdateAlbum = async (event) => {
        event.preventDefault()

        const token = localStorage.getItem('token')

        try {
            await updateAlbum(token, currentAlbum.id, currentAlbum.name, editReleaseDate);
            const response = await fetchByAlbum(token, albumId)
            setAlbum(response.data)

            setEditModalOpen(false)
            setSuccessMessage("Álbum atualizado com sucesso")
            setErrorMessage("")
        } catch (error) {
            setErrorMessage('Erro ao atualizar o álbum, por favor tente novamente.')
            setSuccessMessage('')
        }
    };

    const handleDeleteAlbum = async () => {
        const token = localStorage.getItem('token')

        try {
            await deleteAlbum(token, album.id)
            setSuccessMessage('Álbum deletado com sucesso')
            setErrorMessage('')
            navigate('/dashboard')
        } catch (error) {
            setErrorMessage('Não foi possível deletar o álbum.')
            setSuccessMessage('')
        }
    };

    const handleEdit = () => {
        setCurrentAlbum(album);
        setEditReleaseDate(album.release_date);
        setEditModalOpen(true);
    };

    return (
        <div>
            <Navbar/>
            <div className="album-detail-container">
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {album && (
                    <div className="album-detail">
                        <h1>{album.name}</h1>
                        <p>Data de Lançamento: {album.release_date}</p>
                        <div>
                            <FaEdit className="icon edit" onClick={handleEdit} />
                            <AiTwotoneDelete className="icon delete" onClick={handleDeleteAlbum} />
                        </div>
                    </div>
                )}
                <Modal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} contentLabel="Editar Álbum" className="modal" overlayClassName="modal-overlay">
                    <h2>Editar Álbum</h2>
                    {currentAlbum && (
                        <form onSubmit={handleUpdateAlbum}>
                            <label>
                                Nome do álbum:
                                <input type="text" value={currentAlbum.name} onChange={(e) => setCurrentAlbum({ ...currentAlbum, name: e.target.value })} required />
                            </label>
                            <label>
                                Data de Lançamento:
                                <input type="date" value={editReleaseDate} onChange={(e) => setEditReleaseDate(e.target.value)} required />
                            </label>
                            <button type="submit">Atualizar Álbum</button>
                            <button type="button" onClick={() => setEditModalOpen(false)}>Cancelar</button>
                        </form>
                    )}
                </Modal>
                <div className="signup">
                    <Link to={`/album/${albumId}`}>Músicas</Link>
                </div>
            </div>
        </div>
    );
};
