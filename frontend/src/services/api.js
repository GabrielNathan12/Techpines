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

    return {Api ,login, register}
}

export default Api