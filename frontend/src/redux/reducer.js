import { ADD_PHOTO, ADD_ISLOGIN } from "./actions";

const initialState = {
  photos: [],
  isLogin: false
};

export default function(oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        photos: action.photo
      };
    case ADD_ISLOGIN:
      return {
        isLogin: action.isLogin
      };

    default:
      return oldState;
  }
}
