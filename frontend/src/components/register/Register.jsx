import { useState } from "react"
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa"
import { TextField, Button, Alert, IconButton, InputAdornment } from '@mui/material';
import { MdEmail } from "react-icons/md";
import Api from '../../services/api.js'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassoword] = useState(false)
    const [showPassword, setShowPassoword] = useState(false)
    const [showConfirmPassword, seShowConfirmPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { register } = Api()
    const navigate = useNavigate()

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            setErrorMessage("As senhas não conferem")
            return
        }

        try {
            await register(name, email, password)
            setSuccessMessage("Registro realizado com sucesso")
            setErrorMessage("")
            setTimeout(()=>{
                navigate('/')
            }, 2000)
        } catch (error) {
            setErrorMessage("Esse usuário já está cadastrado")
            setSuccessMessage("")            
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                <div className="input-field">
                    <FaUser className="icon"/>
                    <TextField label="Seu nome" variant="filled" type="text" required onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </div>
                <div className="input-field">
                    <MdEmail className="icon"/>
                    <TextField  label="E-mail" variant="filled" type="email" required onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            disableUnderline: true
                        }}    
                    />
                </div>
                <div className="input-field">
                    <FaLock className="icon"/>
                    <TextField label="Senha" variant="filled" type={showPassword ? 'text': 'password'} required onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassoword(!showPassword)} edge="end">
                                        {showPassword ? <FaEyeSlash className="icon"/> : <FaEye className="icon"/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        />
                </div>
                <div className="input-field">
                    <FaLock className="icon"/>
                    <TextField label="Confirme sua Senha" variant="filled" type={showConfirmPassword ? 'text': 'password'} required onChange={(e) => setConfirmPassoword(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => seShowConfirmPassword(!showPassword)} edge="end">
                                        {showPassword ? <FaEyeSlash className="icon"/> : <FaEye className="icon"/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <Button type="submit">Cadastrar</Button>
            </form>
        </div>
    )
}
