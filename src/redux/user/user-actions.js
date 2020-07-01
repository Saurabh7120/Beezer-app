/*jshint esversion:9*/
import {UserActionTypes} from './user-types';

export const setUserList = users =>({
  type: UserActionTypes.SET_USER_LIST,
  payload: users
});

export const setAccountList = accounts => ({
  type: UserActionTypes.SET_ACCOUNT_LIST,
  payload: accounts
});

export const addRatings = rating => ({
  type: UserActionTypes.ADD_RATING_DETAIL,
  payload: rating
});

export const setRatingList = ratings => ({
  type: UserActionTypes.SET_RATING_LIST,
  payload: ratings
});
