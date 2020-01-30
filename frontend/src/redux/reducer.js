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
} from "./actions";

const initialState = {
  photos: [],
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
        photos: action.photo,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        user: oldState.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };
    case ADD_ISLOGIN:
      return {
        photos: oldState.photos,
        isLogin: action.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        user: oldState.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };
    case ADD_LIKED_BY_USERS:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: action.likedByUsers,
        mutualUsers: [...oldState.mutualUsers],
        user: oldState.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };
    case ADD_MUTUAL_USERS:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: action.mutualUsers,
        user: oldState.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };
    case REMOVE_LIKED_BY_USERS:
      const userToremove = oldState.likedByUsers.filter(
        user => user.id === action.user.id
      );
      const newlikedByUsers = oldState.likedByUsers.filter(
        user => user.id !== action.user.id
      );
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: newlikedByUsers,
        mutualUsers: [...oldState.mutualUsers, userToremove[0]],
        user: oldState.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };
    case EDIT_PROFILE:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        user: action.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };

    case ADD_USER:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        user: action.user,
        usersDashBoard: [...oldState.usersDashBoard]
      };
    case ADD_USERS_DASHBOARD:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        user: oldState.user,
        usersDashBoard: action.users
      };

    case CLEAN_REDUX:
      return {
        photos: [],
        isLogin: false,
        likedByUsers: [],
        mutualUsers: [],
        user: {},
        usersDashBoard: []
      };

    default:
      return oldState;
  }
}
