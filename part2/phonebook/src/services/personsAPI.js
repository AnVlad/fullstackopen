import axios from 'axios';

const baseUrl = '/persons';

const getAll = () => {
  return axios.get(`${baseUrl}`);
};

const createNumber = (newObject) => {
  return axios.post(`${baseUrl}`, newObject);
};

const deleteNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const changeNumber = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const personsAPI = { getAll, createNumber, deleteNumber, changeNumber };

export default personsAPI;
