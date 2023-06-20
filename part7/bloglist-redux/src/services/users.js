import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

const getAllUsers = async () => {
  const allUsers = await axios.get(baseUrl);
  return allUsers.data;
};

const usersService = {
  getAllUsers,
};

export default usersService;
