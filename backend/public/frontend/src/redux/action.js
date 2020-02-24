import {
  ADD_PHOTO,
  ADD_ISLOGIN,
  ADD_LIKED_BY_USERS,
  ADD_MUTUAL_USERS,
  REMOVE_LIKED_BY_USERS,
  EDIT_PROFILE,
  ADD_USER,
  ADD_USERS_DASHBOARD,
  CLEAN_REDUX
} from "./type";

export const AddPhotoAC = photo => {
  return {
    type: ADD_PHOTO,
    photo
  };
};

export const AddIsLogin = toogle => {
  return {
    type: ADD_ISLOGIN,
    isLogin: toogle
  };
};

export const AddLikedByUsers = users => {
  return {
    type: ADD_LIKED_BY_USERS,
    likedByUsers: users
  };
};

export const RemoveLikedByUsers = user => {
  return {
    type: REMOVE_LIKED_BY_USERS,
    user
  };
};

export const AddMutualUser = users => {
  return {
    type: ADD_MUTUAL_USERS,
    mutualUsers: users
  };
};

export const EditProfilePageAC = newProfile => {
  return {
    type: EDIT_PROFILE,
    user: newProfile
  };
};

export const AddUserAC = user => {
  return {
    type: ADD_USER,
    user
  };
};

export const AddUsersDashBoard = users => {
  return {
    type: ADD_USERS_DASHBOARD,
    users
  };
};

export const CleanReduxAC = () => {
  return {
    type: CLEAN_REDUX
  };
};
