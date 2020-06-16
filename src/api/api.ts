import axios from 'axios';

const instance = axios.create({
  // withCredentials: true,
  baseURL: 'http://77.120.241.80:8911/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
const API = {
  getUsers() {
    return instance.get(`users`).then((response) => response.data);
  },
  getPost(userId: number) {
    return instance.get(`user/${userId}`);
  },
  postPost(name: string, surname: string, desc: string) {
    return instance.post(`users`, { name, surname, desc });
  },
  removePost(userId: number) {
    return instance.delete(`user/${userId}`);
  },
  editPost(userId: number, name: string, surname: string, desc: string) {
    return instance.put(`user/${userId}`, { name, surname, desc });
  },
};

export default API;
