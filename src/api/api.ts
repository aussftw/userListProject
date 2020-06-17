import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://77.120.241.80:8911/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
const API = {
  getUsers() {
    return instance.get(`users`).then((response) => response.data);
  },
  getUser(userId: string) {
    return instance.get(`user/${userId}`);
  },
  postUser(name: string, surname: string, desc: string) {
    return instance.post(`users`, { name, surname, desc });
  },
  removeUser(userId: number) {
    return instance.delete(`user/${userId}`);
  },
  editUser(userId: number, name: string, surname: string, desc: string) {
    return instance.put(`user/${userId}`, { name, surname, desc });
  },
};

export default API;
