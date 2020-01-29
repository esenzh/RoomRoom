import { ADD_PHOTO, ADD_ISLOGIN, ADD_LIKED_BY_USERS, ADD_MUTUAL_USERS, REMOVE_LIKED_BY_USERS,ADD_USERS_DASHBOARD } from "./actions";

export const AddPhotoAC = photo => {
  return {
    type: ADD_PHOTO,
    photo
  };
};

export const AddIsLogin = (toogle) => {
  return {
    type: ADD_ISLOGIN,
    isLogin: toogle
  };
};

export const AddLikedByUsers = (users) => {
  return {
    type: ADD_LIKED_BY_USERS,
    likedByUsers: users
  };
};

export const RemoveLikedByUsers = (user) => {
  return {
    type: REMOVE_LIKED_BY_USERS,
    user: user
  };
};

export const AddMutualUser = (users) => {
  return {
    type: ADD_MUTUAL_USERS,
    mutualUsers: users
  };
};
export const AddUsersDashBoard = (users) => {
  return {
    type: ADD_USERS_DASHBOARD,
    users: users
  };
};