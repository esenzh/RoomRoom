import {
  ADD_PHOTO,
  ADD_ISLOGIN,
  ADD_LIKED_BY_USERS,
  ADD_MUTUAL_USERS,
  REMOVE_LIKED_BY_USERS,
  EDIT_PROFILE,
  EDIT_PROFILE_EDIT,
  ADD_USER
} from "./actions";

const initialState = {
  photos: [],
  isLogin: false,
  likedByUsers: [],
  mutualUsers: [],
  editProfile: false,
  user: {}
};

export default function(oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        photos: action.photo,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        editProfile: oldState.editProfile,
        user: oldState.user
      };
    case ADD_ISLOGIN:
      return {
        photos: oldState.photos,
        isLogin: action.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        editProfile: oldState.editProfile,
        user: oldState.user
      };
    case ADD_LIKED_BY_USERS:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: action.likedByUsers,
        mutualUsers: [...oldState.mutualUsers],
        editProfile: oldState.editProfile,
        user: oldState.user
      };
    case ADD_MUTUAL_USERS:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: action.mutualUsers,
        editProfile: oldState.editProfile,
        user: oldState.user
      };
    case REMOVE_LIKED_BY_USERS:
      const newlikedByUsers = oldState.likedByUsers.filter(
        user => user.id !== action.user.id
      );
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: newlikedByUsers,
        mutualUsers: [...oldState.mutualUsers],
        editProfile: oldState.editProfile,
        user: oldState.user
      };
    case EDIT_PROFILE:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        editProfile: action.editProfile,
        user: oldState.user
      };
    case EDIT_PROFILE_EDIT:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        editProfile: oldState.editProfile,
        user: action.user
      };

    case ADD_USER:
      return {
        photos: oldState.photos,
        isLogin: oldState.isLogin,
        likedByUsers: [...oldState.likedByUsers],
        mutualUsers: [...oldState.mutualUsers],
        editProfile: oldState.editProfile,
        user: action.user
      };

    default:
      return oldState;
  }
}
