import axios from 'axios';
const BASE = import.meta.env.VITE_API || 'https://promethique-backend.onrender.com/api';
export const api = axios.create({ baseURL: BASE });
