import axios from 'axios';
const baseUrl = '/api/blogs';
const baseUrlForLogin = '/api/login';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrlForLogin, credentials);
  return response.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, login, createBlog, setToken };
