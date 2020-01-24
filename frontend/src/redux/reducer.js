import { ADD_PHOTO } from "./actions";

const initialState = {
  photos: []
};

export default function(oldState = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        photos: action.photo
      };

    default:
      return oldState;
  }
}
