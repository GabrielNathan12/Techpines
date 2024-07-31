import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Alert } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
import Api from '../../services/api';
import './Dashboard.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root'); 

export const Dashboard = () => {
    const navigate = useNavigate()
    const { fetchAllAlbums, addAlbum, updateAlbum, deleteAlbum } = Api()
    const [albums, setAlbums] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [albumToEdit, setAlbumToEdit] = useState(null)
    const [name, setName] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchAll = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                return navigate('/')
            }

            try {
                const response = await fetchAllAlbums(token)
                setAlbums(response.data)
            } catch (error) {
                console.error('Erro ao buscar álbuns:', error)
                if (error.response && error.response.status === 401) {
                    navigate('/')
                }
            }
        };
        fetchAll()
    }, []);

    const handleAddAlbum = async (event) => {
        event.preventDefault()
    
        const token = localStorage.getItem('token')

        try {
            await addAlbum(token, name, releaseDate)

            const response = await fetchAllAlbums(token)
            setAlbums(response.data)
            
            setModalOpen(false)
            setSuccessMessage("Cadastro realizado com Sucesso")
            setErrorMessage("")
            setName('')
            setReleaseDate('')
        } catch (error) {
            setErrorMessage('Por favor, verifique os campos e tente novamente.')
            setSuccessMessage('')
        }
    };

    const handleUpdateAlbum = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        try {
            await updateAlbum(token, albumToEdit.id, name, releaseDate)

            const response = await fetchAllAlbums(token)
            setAlbums(response.data)

            setEditModalOpen(false)
            setSuccessMessage('Álbum atualizado com sucesso')
            setErrorMessage('')
        } catch (error) {
            setErrorMessage('Por favor, verifique os campos.')
            setSuccessMessage('')
        }
    };

    const handleDeleteAlbum = async (album) =>{
        const token = localStorage.getItem('token')

        try {
            await deleteAlbum(token, album)

            const response = await fetchAllAlbums(token)
            setAlbums(response.data)

            setSuccessMessage('Álbum deletado com sucesso')
            setErrorMessage('')
        } catch (error) {
            setErrorMessage('Não foi possível deletar o álbum.');
            setSuccessMessage('')
        }
    }

    const handleEdit = (album) => {
        setAlbumToEdit(album)
        setName(album.name)
        setReleaseDate(album.release_date)
        setEditModalOpen(true)
    }


    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                
            <div className="add-album-card" onClick={() => setModalOpen(true)}>
                <IoMdAddCircle className="add-icon"/>
            </div>
            <div className="album-grid">
                {albums.map(album => (
                    <div className="album-card" key={album.id}>
                        <div className="album-card-icons">
                            <AiTwotoneDelete className="icon" onClick={()=> handleDeleteAlbum(album.id)}/>
                            <FaEdit className="icon" onClick={() => handleEdit(album)} />
                        </div>
                        <Link to={`/album/${album.id}`} className="album-card-link">
                            <div className="album-card-content">
                                <p>{album.name}</p>
                                <p>{album.release_date}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="Adicionar Novo Álbum" className="modal" 
                overlayClassName="modal-overlay" >
                <h2>Adicionar um Novo Álbum</h2>
                <form onSubmit={handleAddAlbum}>
                    <label>
                        Nome do Álbum:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Data de Lançamento:
                        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                    </label>
                    <button type="submit">Adicionar Álbum</button>
                    <button type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                </form>
            </Modal>
            <Modal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} contentLabel="Editar Álbum" className="modal" 
                overlayClassName="modal-overlay">
                <h2>Edição do Álbum</h2>
                <form onSubmit={handleUpdateAlbum}>
                    <label>
                        Nome do Álbum:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Data de Lançamento:
                        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                    </label>
                    <button type="submit">Atualizar Álbum</button>
                    <button type="button" onClick={() => setEditModalOpen(false)}>Cancelar</button>
                </form>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </Modal>
        </div>
    );
};
