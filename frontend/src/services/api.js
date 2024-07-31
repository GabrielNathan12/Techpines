import axios from 'axios'


const Api = () => {
    const api = axios.create({
        baseURL: "http://localhost:80/",
    });
    
    const login = (email, password) => {
        return api.post('api/login', {
            "email": email, 
            "password": password
        })
    }

    const register = (name, email, password) => {
        return api.post('api/users', {
            "name": name,
            "email": email,
            "password": password
        })
    }

    const fetchAllAlbums = (token) => {
        return api.get('api/albuns', {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
    }

    const addAlbum = (token, name, releaseDate) => {
        return api.post('api/albuns', {
            "name": name,
            "release_date": releaseDate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    const updateAlbum = (token, id, name, releaseDate) => {
        return api.put(`api/albuns/${id}`, {
            "name": name,
            "release_date": releaseDate
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    const deleteAlbum = (token, id) => {
        return api.delete(`api/albuns/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return {Api ,login, register, fetchAllAlbums, addAlbum, updateAlbum, deleteAlbum}
}

export default Api