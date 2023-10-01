import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://hackyeah-back-production.up.railway.app'
});
