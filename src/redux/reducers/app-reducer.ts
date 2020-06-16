import { PostsType } from '../../interfaces/index';
import * as constants from '../constants';
import { AppAcationTypes } from '../actions/index';
import { UserType } from '../../interfaces/index';

const initialState = {
  users: [] as Array<UserType>,
  singlePost: {} as PostsType,
  error: false,
};

const appReducer = (state = initialState, action: AppAcationTypes) => {
  switch (action.type) {
    case constants.SET_POSTS:
      return {
        ...state,
        users: action.users,
      };
    case constants.GET_POST:
      return {
        ...state,
        singlePost: action.singlePost,
      };
    case constants.ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default appReducer;
