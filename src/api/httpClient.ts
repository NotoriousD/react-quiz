import axios from 'axios';

const DEFAULT_API_URL = 'https://test-api-3bob.onrender.com/api';

export const httpClient = axios.create({
  baseURL: DEFAULT_API_URL,
});
