import API from '../../api/api';
import * as constants from '../constants';
import { PostsType } from '../../interfaces/index';
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

type SetSinglePost = {
  type: typeof constants.GET_POST;
  singlePost: PostsType;
};
export const setSinglePost = (singlePost: PostsType): SetSinglePost => {
  return {
    type: constants.GET_POST,
    singlePost,
  };
};

type SetPostsType = {
  type: typeof constants.SET_POSTS;
  users: any;
};
export const setPosts = (users: UserType): SetPostsType => {
  return {
    type: constants.SET_POSTS,
    users,
  };
};

export const createPost = (name: string, surname: string, desc: string) => async (dispatch: any) => {
  const res = await API.postPost(name, surname, desc);
  if (res.status === 201) {
    const data = await API.getUsers();
    dispatch(setPosts(data));
  }
};

export const deletePost = (postId: number) => async (dispatch: any) => {
  const res = await API.removePost(postId);
  if (res.status === 200) {
    setError(false);
    const data = await API.getUsers();
    dispatch(setPosts(data));
  } else {
    dispatch(setError(true));
  }
};

export const getPost = (postId: number) => async (dispatch: any) => {
  const res = await API.getPost(postId);
  if (res.status === 200) {
    dispatch(setSinglePost(res.data));
  }
};

export const editPost = (userId: number, name: string, surname: string, desc: string) => async (dispatch: any) => {
  const res = await API.editPost(userId, name, surname, desc);
  if (res.status === 200) {
    const data = await API.getUsers();
    dispatch(setPosts(data));
    await Router.push(`/posts/${userId}`);
  } else {
    dispatch(setError(true));
  }
};

export const getUsers = () => async (dispatch: any) => {
  const data = await API.getUsers();
  dispatch(setPosts(data));
};

export type AppAcationTypes = SetError | SetSinglePost | SetPostsType;
