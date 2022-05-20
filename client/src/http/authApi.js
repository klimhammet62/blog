import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5656/auth',
    headers: {
        'Content-Type': 'application/json',
    }
})

let data

export const $authApi = async ({ url, type = 'GET', auth = true, body }) => {
    if (auth) {
        const token = localStorage.getItem('token');
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    try {
        // eslint-disable-next-line default-case
        switch (type) {
            case 'GET':
                data = await instance.get(url)
                return data

            case 'POST':
                data = await instance.post(url, body)
                return data

            case 'PUT':
                data = await instance.put(url, body)
                return data

            case 'DELETE':
                data = await instance.delete(url, body)
                return data
        }
        return data.data
    } catch (error) {
        throw error?.response?.data ? error.response.data : error.message
    }

}