// ACTION TYPES
const SET_USER = "SET_USER";

// ACTION CREATORS
export const setUser = (user) => ({
  type: SET_USER,
  user,
});

// REDUCER
const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
