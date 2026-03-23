import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

export const fetchUsers = (since = 0) => {
  return githubApi.get(`/users?since=${since}&per_page=30`);
};

export default githubApi;
