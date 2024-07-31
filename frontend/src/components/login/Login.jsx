import { useState } from "react"
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TextField, Button, Alert, IconButton, InputAdornment } from '@mui/material';
import { Link } from "react-router-dom";
import Api from '../../services/api.js'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassoword] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { login } = Api()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await login(email, password)
            setSuccessMessage("Login realizado com Sucesso")
            setErrorMessage("")
            const token = response.data.token

            localStorage.setItem('token', token)

            setTimeout(()=>{
                navigate('/')
            }, 2000)
            
        } catch (error) {
            setErrorMessage('Por favor check suas credenciais.')
            setSuccessMessage('')
        }
        


    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Techpines</h1>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                
                <div className="input-field">
                    <MdEmail className="icon" />
                    <TextField label="E-mail" variant="filled" type="email" required onChange={(e) => setEmail(e.target.value)} 
                        InputProps={{
                            disableUnderline: true
                        }}
                        />
                </div>
                <div className="input-field">
                    <FaLock className="icon"/>
                    <TextField label="Senha" variant="filled" type={showPassword ? 'text' : 'password'} required onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassoword(!showPassword)} endge="end">
                                        {showPassword ? <FaEyeSlash className="icon" /> : <FaEye className="icon"/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        />
                </div>
                <Button type="submit">Login</Button>
                <div className="signup">
                    <Link to={'/register'}>Cadastrar</Link>
                </div>
            </form>
        </div>
    )
}