import * as constants from '../constants';
import { AppAcationTypes } from '../actions/index';
import { UserType } from '../../interfaces/index';

const initialState = {
  users: [] as Array<UserType>,
  singleUser: {} as UserType,
  error: false,
};

const appReducer = (state = initialState, action: AppAcationTypes) => {
  switch (action.type) {
    case constants.SET_USERS:
      return {
        ...state,
        users: action.users,
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
