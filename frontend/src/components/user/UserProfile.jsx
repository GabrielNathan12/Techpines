import { useState, useEffect } from 'react'
import Api from '../../services/api'
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa"
import { TextField, Button, Alert, IconButton, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md"
import Navbar from '../navbar/Navbar'
import "./UserProfile.css"

export const UserProfile = () => {
    const navigate = useNavigate()
    const { fetchAllUsers, updateUser, deleteUser } = Api()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [user, setUser] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            const email = localStorage.getItem('email')

            if (!token) {
                return navigate('/')
            }

            try {
                const response = await fetchAllUsers(token)
                const filtered = response.data.filter(user => user.email === email)
                if (filtered.length > 0) {
                    const currentUser = filtered[0];
                    setUser(currentUser)
                    setName(currentUser.name)
                    setEmail(currentUser.email)
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error)
                if (error.response && error.response.status === 401) {
                    navigate('/')
                }
            }
        };
        fetchUser()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        if (password !== confirmPassword) {
            setErrorMessage("As senhas não conferem")
            return
        }

        try {
            await updateUser(token, user.id, name, email, password)
            setSuccessMessage("Dados atualizados com sucesso")
            setErrorMessage("")
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            setErrorMessage("Não foi possível atualizar os dados");
            setSuccessMessage("")
        }
    };

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token')
        try {
            await deleteUser(token, user.id);
            setSuccessMessage("Conta deletada com sucesso")
            setErrorMessage("")
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            navigate('/')
        } catch (error) {
            setErrorMessage("Não foi possível deletar a conta")
            setSuccessMessage("")
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Editar Perfil</h1>
                    {successMessage && <Alert severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                    <div className="input-field">
                        <FaUser className="icon" />
                        <TextField label="Seu nome" variant="filled" type="text" value={name} required onChange={(e) => setName(e.target.value)}
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    </div>
                    <div className="input-field">
                        <MdEmail className="icon" />
                        <TextField label="E-mail" variant="filled" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    </div>
                    <div className="input-field">
                        <FaLock className="icon" />
                        <TextField label="Senha" variant="filled" type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <FaEyeSlash className="icon" /> : <FaEye className="icon" />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div className="input-field">
                        <FaLock className="icon" />
                        <TextField label="Confirme sua Senha" variant="filled" type={showConfirmPassword ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                            {showConfirmPassword ? <FaEyeSlash className="icon" /> : <FaEye className="icon" />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <Button type="submit">Atualizar Dados</Button>
                    <Button className="button-delete" color="error" onClick={() => setConfirmDeleteOpen(true)}>Deletar Conta</Button>
                </form>
            </div>

            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Confirmação de Exclusão"}
                </DialogTitle>
                <DialogContent>
                    <p>Tem certeza de que deseja excluir a sua conta? Esta ação não pode ser desfeita.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
                    <Button color="error" onClick={handleDeleteUser} autoFocus>
                        Deletar Conta
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
