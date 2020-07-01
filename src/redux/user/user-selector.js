/*jshint esversion:9*/

import {createSelector} from 'reselect';


const selectUser = state => state.user;

export const selectUserList = createSelector(
    [selectUser],
    user => user.userList
);

export const selectAccountList = createSelector(
  [selectUser],
  user => user.accountList
);

export const selectRatingList = createSelector(
  [selectUser],
  user => user.ratingList
);
