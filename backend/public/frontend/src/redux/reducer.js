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

export default function (oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        // Всегда вытаскивайте сначала элементы из старого стейта
        // И нет смысла указывать те части стейта, которые не изменяются
        ...oldState,
        photos: action.photo,
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
      // В этом кейсе сложноватые манипуляции. 
      // Мне кажется можно обойтись меньшим количеством кода.
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
