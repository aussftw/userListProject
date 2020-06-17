import * as constants from '../constants';
import { AppAcationTypes } from '../actions/index';
import { UserType } from '../../interfaces/index';

const initialState = {
  users: [] as Array<UserType>,
  usersLoading: false,
  userLoading: false,
  singleUser: {} as UserType,
  error: false,
};

const appReducer = (state = initialState, action: AppAcationTypes) => {
  switch (action.type) {
    case constants.SET_USERS_PENDING:
      return {
        ...state,
        usersLoading: action.usersLoading,
      };
    case constants.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case constants.SET_USER_PENDING:
      return {
        ...state,
        userLoading: action.userLoading,
      };
    case constants.GET_USER:
      return {
        ...state,
        singleUser: action.singleUser,
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
