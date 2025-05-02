import axios from 'axios';

const api = axios.create({
    baseURL: 'https://app-api-six.vercel.app/',
});

export default api;