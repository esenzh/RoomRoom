import { ADD_PHOTO, ADD_ISLOGIN } from "./actions";

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
