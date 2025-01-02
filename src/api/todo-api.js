import axios from "axios";

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem("token") || null;
    }

    get headers() {
        return {
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
            return [];
        } catch (error) {
            const validationErrors = error?.response?.data?.errors || [error];
            const credValidationErrors = error?.response?.data?.message;
            const combinedErrors =
                validationErrors.length > 0
                    ? validationErrors.map((err) => err?.msg || err.message)
                    : [credValidationErrors];
            setError(combinedErrors);
            return combinedErrors;
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
    }

    async getTasks(setError) {
        try {
            const response = await axios.get(`${this.baseURL}/todos`, {
                headers: this.headers,
            });
            return response.data;
        } catch (error) {
            setError([error?.response?.data?.message]);
            return [];
        }
    }

    async addTask(title, setError) {
        try {
            const response = await axios.post(
                `${this.baseURL}/todos`,
                { title },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            setError([error?.response?.data?.message]);
            return [];
        }
    }

    async deleteTask(id, setError) {
        try {
            const response = await axios.delete(`${this.baseURL}/todos/${id}`, {
                headers: this.headers,
            });
            return response.data;
        } catch (error) {
            setError([error?.response?.data?.message]);
            return [];
        }
    }

    async toggleCompleted(id, setError) {
        try {
            const response = await axios.patch(
                `${this.baseURL}/todos/${id}/isCompleted`,
                { id },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            setError([error?.response?.data?.message]);
            return [];
        }
    }

    async updateTask(id, title, setError) {
        try {
            const response = await axios.patch(
                `${this.baseURL}/todos/${id}`,
                { title },
                { headers: this.headers }
            );
            return response.data;
        } catch (error) {
            setError([error?.response?.data?.message]);
            return [];
        }
    }
}

export const api = new ApiService("https://todo-redev.herokuapp.com/api");
