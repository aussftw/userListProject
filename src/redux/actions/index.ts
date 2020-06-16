import API from '../../api/api';
import * as constants from '../constants';
import Router from 'next/router';
import { UserType } from '../../interfaces';

type SetError = {
  type: typeof constants.ERROR;
  error: boolean;
};
export const setError = (error: boolean): SetError => {
  return {
    type: constants.ERROR,
    error,
  };
};

type SetSingleUser = {
  type: typeof constants.GET_USER;
  singleUser: UserType;
};
export const setSingleUser = (singleUser: UserType): SetSingleUser => {
  return {
    type: constants.GET_USER,
    singleUser,
  };
};

type SetUsersType = {
  type: typeof constants.SET_USERS;
  users: any;
};
export const setUsers = (users: UserType): SetUsersType => {
  return {
    type: constants.SET_USERS,
    users,
  };
};

export const createUser = (name: string, surname: string, desc: string) => async (dispatch: any) => {
  const res = await API.postUser(name, surname, desc);
  if (res.status === 201) {
    const data = await API.getUsers();
    dispatch(setUsers(data));
  }
};

export const deleteUser = (userId: number) => async (dispatch: any) => {
  const res = await API.removeUser(userId);
  if (res.status === 200) {
    setError(false);
    const data = await API.getUsers();
    dispatch(setUsers(data));
  } else {
    dispatch(setError(true));
  }
};

export const getSingleUser = (userId: string) => async (dispatch: any) => {
  const res = await API.getUser(userId);
  if (res.status === 200) {
    dispatch(setSingleUser(res.data));
  }
};

export const editUser = (userId: number, name: string, surname: string, desc: string) => async (dispatch: any) => {
  const res = await API.editUser(userId, name, surname, desc);
  if (res.status === 200) {
    const data = await API.getUsers();
    dispatch(setSingleUser(data));
    await Router.push('/');
  } else {
    dispatch(setError(true));
  }
};

export const getUsers = () => async (dispatch: any) => {
  const data = await API.getUsers();
  dispatch(setUsers(data));
};

export type AppAcationTypes = SetError | SetSingleUser | SetUsersType;
