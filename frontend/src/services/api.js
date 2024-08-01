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
    const logout = (token, id) => {
        return api.post(`api/logout/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    const fetchAllUsers = (token) => {
        return api.get(`api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
    }
    const updateUser = (token, id, name, email, password) => {
        return api.put(`api/users/${id}`, {
            "name": name,
            "email": email,
            "password": password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    const deleteUser = (token, id) => {
        return api.delete(`api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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
    const fetchByAlbum = (token , id) => {
        return api.get(`api/albuns/${id}`, {
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

    const fetchAllTracks = (token) => {
        return api.get('api/tracks', {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
    }

    const addTrack = (token, name, letter, duration, album_id) => {
        return api.post('api/tracks' , {
            "name": name, 
            "duration": duration,
            "letter": letter,
            "album_id": album_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    const updateTrack = (token, id, name, letter, duration, album_id) => {
        return api.put(`api/tracks/${id}` , {
            "name": name, 
            "duration": duration,
            "letter": letter,
            "album_id": album_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    const fetchByTracks = (token, id) => {
        return api.get(`api/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
    }
    const deleteTrack = (token, id) => {
        return api.delete(`api/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return { Api, login, logout, register, fetchAllUsers, updateUser, deleteUser, 
            fetchAllAlbums, addAlbum, updateAlbum, deleteAlbum, fetchByAlbum,
            fetchAllTracks, addTrack, updateTrack, deleteTrack, fetchByTracks
        }
}

export default Api