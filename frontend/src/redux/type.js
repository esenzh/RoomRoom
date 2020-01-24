import { ADD_PHOTO } from "./actions";

export const AddPhotoAC = photo => {
  return {
    type: ADD_PHOTO,
    photo
  };
};
