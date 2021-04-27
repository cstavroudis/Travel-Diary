// ACTION TYPES
const SET_TRIP = "SET_TRIP";
const SET_TRIPS = "SET_TRIPS";

// ACTION CREATORS
export const setTrip = (trip) => ({
  type: SET_TRIP,
  trip,
});

export const setTrips = (trips) => ({
  type: SET_TRIPS,
  trips,
});

const initialState = {
  single: {},
  all: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRIP:
      return { ...state, single: action.trip };
    case SET_TRIPS:
      return { ...state, all: action.trips };
    default:
      return state;
  }
}
