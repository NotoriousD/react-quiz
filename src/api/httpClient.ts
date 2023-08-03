import axios from 'axios';

const DEFAULT_API_URL = 'https://api.help-ukraine.org.ua/api';

export const httpClient = axios.create({
  baseURL: DEFAULT_API_URL,
});
