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
    handleError(error, setError) {
        if (error.response) {
            const { status, data } = error.response;

            if (data.errors && Array.isArray(data.errors)) {
                const validationErrors = data.errors.map(
                    (err) => err?.msg || "Validation error"
                );
                setError(validationErrors);
                return [];
            }

            if (status === 400 && data.message) {
                setError([data.message]);
                return [];
            }
        }

        if (error.message) {
            const networkError = `${error.message}. Check server URL.`;
            setError([networkError]);
            return [];
        }

        setError(["Unknown error"]);
        return [];
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
            return this.handleError(error, setError);
        }
    }

    async registration({ username, email, password, gender, age }, setError) {
        try {
            const response = await axios.post(
                `${this.baseURL}/users/register`,
                { username, email, password, gender, age }
            );
            return response.data;
        } catch (error) {
            return this.handleError(error, setError);
        }
    }

    async getTasks(setError) {
        try {
            const response = await axios.get(`${this.baseURL}/todos`, {
                headers: this.headers,
            });
            return response.data;
        } catch (error) {
            return this.handleError(error, setError);
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
            return this.handleError(error, setError);
        }
    }

    async deleteTask(id, setError) {
        try {
            const response = await axios.delete(`${this.baseURL}/todos/${id}`, {
                headers: this.headers,
            });
            return response.data;
        } catch (error) {
            return this.handleError(error, setError);
        }
    }

    async toggleCompleted(id, setError) {
        try {
            const response = await axios.patch(
                `${this.baseURL}/todos/${id}/isCompleted`,
                { id },
                { headers: this.headers }
            );
            return response.data[0];
        } catch (error) {
            return this.handleError(error, setError);
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
            return this.handleError(error, setError);
        }
    }
}

export const api = new ApiService("https://todo-redev.herokuapp.com/api");
