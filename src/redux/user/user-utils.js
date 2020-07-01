/*jshint esversion:9*/
/*jshint -W087 */
import * as firebase from 'firebase';

export const setUsers = () => {

  let userResults = null;
  const users = [];
  const userRef = firebase.database().ref().child('users');
  userRef.on('value',snap =>{
    userResults = snap.val();
    const userArray = Object.entries(userResults);
    userArray.forEach(([key, value]) => {
      const userDetails = {
        name:value.name,
        accountId: value.account
      };
      users.push(userDetails);
    });
      debugger
      return users;
        });
};
