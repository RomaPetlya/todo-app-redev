import axios from "axios";


class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem("token") || null;
        this.headers = {
            Authorization: `Bearer ${this.token}`,
        };
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem("token", token);
    }

    async login({ email, password }, setError) {
        try {
            setError([]);
            const response = await axios.post(`${this.baseURL}/auth/login`, {
                email,
                password,
            });
            const { token } = response.data;
            this.setToken(token);
        } catch (error) {
            const validationErrors = error?.response?.data?.errors || [];
            const credValidationErrors = error?.response?.data?.message;
            const combinedErrors =
                validationErrors.length > 0
                    ? validationErrors.map((err) => err?.msg)
                    : [credValidationErrors];
            setError(combinedErrors);
        }
    }

    async registration({ username, email, password, gender, age }, setError) {
        try {
            const response = await axios.post(
                `${this.baseURL}/users/register`,
                { username, email, password, gender, age }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            setError(
                error?.response?.data?.errors?.map((err) => err?.msg) || [
                    error?.response?.data?.message,
                ]
            );
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

export const api = new ApiService("https://todo-redev.herokuapp.com/api");
