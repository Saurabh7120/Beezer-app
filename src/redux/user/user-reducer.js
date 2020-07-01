/*jshint esversion:9*/
import {UserActionTypes} from './user-types';
import {setUsers} from './user-utils';

const Initial_State={
  userList:[],
  accountList:[],
  ratingList:[]
};

const userReducer = (state=Initial_State, action) => {
  debugger
  switch (action.type) {
    case UserActionTypes.SET_USER_LIST:
      return{
      ...state,
      userList:action.payload
    };

    case UserActionTypes.SET_ACCOUNT_LIST:
    return{
      ...state,
      accountList:action.payload
    };

    case UserActionTypes.ADD_RATING_DETAIL:
    return{
      ...state,
      ratingList:[...state.ratingList,action.payload]
    };

    case UserActionTypes.SET_RATING_LIST:
    return{
      ...state,
      ratingList:action.payload
    };

    default:
      return state;
  }
};
 export default userReducer;
