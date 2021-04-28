// ACTION TYPES
const SET_TRIP = "SET_TRIP";
const SET_TRIPS = "SET_TRIPS";
const ADD_TRIP = "ADD_TRIP";
const DELETE_TRIP = "DELETE_TRIP";
const EDIT_TRIP = "EDIT_TRIP";

// ACTION CREATORS
export const setTrip = (trip) => ({
  type: SET_TRIP,
  trip,
});

export const setTrips = (trips) => ({
  type: SET_TRIPS,
  trips,
});

export const addTrip = (trip) => ({
  type: ADD_TRIP,
  trip,
});

export const deleteTrip = (tripId) => ({
  type: DELETE_TRIP,
  tripId,
});

export const editTrip = (editedTrip) => ({
  type: EDIT_TRIP,
  editedTrip,
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
    case ADD_TRIP:
      return { ...state, all: [...state.all, action.trip] };
    case DELETE_TRIP:
      return {
        ...state,
        all: state.all.filter((trip) => trip.id !== action.tripId),
      };
    case EDIT_TRIP:
      return {
        ...state,
        all: state.all.map((trip) =>
          trip.id === action.editedTrip.id ? action.editedTrip : trip
        ),
      };
    default:
      return state;
  }
}
