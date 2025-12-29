import axios from 'axios';

export const getUsers = (page) =>
  axios.get(`http://localhost:5000/users?page=${page}&limit=10`);
