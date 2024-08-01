import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { FaRegUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { CiLogout } from "react-icons/ci"
import { useState, useEffect } from 'react'
import Api from '../../services/api'

const Navbar = () => {
    const navigate = useNavigate()
    const { fetchAllUsers, logout} = Api()
    const [user, setUser] = useState(null)

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
                    const currentUser = filtered[0]
                    setUser(currentUser)
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

    const logoutUser = async () => {
        const token = localStorage.getItem('token')
        try {
            await logout(token, user.id)
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            setUser(null)
            navigate('/')

        }catch (error) {
            console.log("Error",error)
        }
    }

    return (
        <div className="navbar">
            <IoHomeOutline className="navbar-icon" onClick={() => navigate('/dashboard')}  title="Dashboard" />
            <FaRegUserCircle className="navbar-icon" onClick={() => navigate('/user')} title="Perfil"/>
            <CiLogout className='navbar-icon' onClick={logoutUser} />
        </div>
    );
};

export default Navbar;
