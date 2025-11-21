import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.4:3000', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
