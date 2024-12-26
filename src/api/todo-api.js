import axios from 'axios';



class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('token') || null;
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    async login({email, password}, setError) {
        try {
            const response = await axios.post(`${this.baseURL}/auth/login`, {email, password});
            const {token} = response.data;
            this.setToken(token);
        } catch (error) {
            console.error('Auth error:', error?.response?.data?.message || error?.response?.data?.errors);
            setError(error?.response?.data?.message)
        }
    }

    async registration ({username, email, password, gender, age}) {
    try {
        const response = await axios.post(`${this.baseURL}/users/register`, {username, email, password, gender, age});
        return response.data;
    }
    catch (error) {
        console.error(error.response.data.message);
        return error.response.data.message
    }
    // const datareg = {
    //     username : "zxcvb123121231aad31",
    //     password : "Zxcvb123123123!",
    //     email : "zxcasdasd123vb@gmail.com",
    //     gender : "male",
    //     age : 23,
    // }

    // const reg = await api.registration(datareg)
    // console.log(data);
    // console.log(reg);
}
}

export const api = new ApiService("https://todo-redev.herokuapp.com/api")

