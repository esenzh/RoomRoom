import {
  ADD_PHOTO,
  ADD_ISLOGIN,
  ADD_APARTMENT_PHOTO,
  ADD_LIKED_BY_USERS,
  ADD_MUTUAL_USERS,
  REMOVE_LIKED_BY_USERS,
  EDIT_PROFILE,
  ADD_USER,
  ADD_USERS_DASHBOARD,
  CLEAN_REDUX
} from "./type";

const initialState = {
  photos: [],
  apartmentPhotos: [],
  isLogin: false,
  likedByUsers: [],
  mutualUsers: [],
  user: {},
  usersDashBoard: []
};

export default function(oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...oldState,
        photos: action.photo
      };
    case ADD_APARTMENT_PHOTO:
      return {
        ...oldState,
        apartmentPhotos: action.photo
      };
    case ADD_ISLOGIN:
      return {
        ...oldState,
        isLogin: action.isLogin,
      };
    case ADD_LIKED_BY_USERS:
      return {
        ...oldState,
        likedByUsers: action.likedByUsers,
      };
    case ADD_MUTUAL_USERS:
      return {
        ...oldState,
        mutualUsers: action.mutualUsers,
      };
    case REMOVE_LIKED_BY_USERS:
      const userToremove = oldState.likedByUsers.filter(
        user => user.id === action.user.id
      );
      const newlikedByUsers = oldState.likedByUsers.filter(
        user => user.id !== action.user.id
      );
      return {
        ...oldState,
        likedByUsers: newlikedByUsers,
        mutualUsers: [...oldState.mutualUsers, userToremove[0]],
      };
    case EDIT_PROFILE:
      return {
        ...oldState,
        user: action.user,
      };

    case ADD_USER:
      return {
        ...oldState,
        user: action.user,
      };
    case ADD_USERS_DASHBOARD:
      return {
        ...oldState,
        usersDashBoard: action.users
      };

    case CLEAN_REDUX:
      return oldState;

    default:
      return oldState;
  }
}
