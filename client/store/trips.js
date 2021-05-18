import firebase from "../../Firebase";

const db = firebase.firestore();

// ACTION TYPES
const SET_TRIP = "SET_TRIP";
const SET_TRIPS = "SET_TRIPS";
const ADD_TRIP = "ADD_TRIP";
const DELETE_TRIP = "DELETE_TRIP";
const EDIT_TRIP = "EDIT_TRIP";
const ADD_ENTRY = "ADD_ENTRY";

// temp data
/*
const myTrips = [
  {
    id: 0,
    title: "Panama City & Bocas del Toro",
    countries: {
      Panama: [8.591203331991537, -80.23045274204661],
    },
    startDate: "01/01/2021",
    endDate: "01/07/2021",
    entries: [
      {
        id: 1,
        title: "Day 1 - Panama City",
        date: "01/01/2021",
        body: "Today we arrived in Panama City. It was on lockdown!!",
      },
      {
        id: 2,
        title: "Day 2 - Panama City",
        date: "01/02/2021",
        body:
          "Went on a tour with airport driver in the morning, then sat around with nothing to do the rest of the day.",
      },
      {
        id: 3,
        title: "Day 3 - Panama City => Bocas del Toro",
        date: "01/03/2021",
        body:
          "Left Panama City today finally. Went on a tiny prop plane from the '80s. Thank god we didn't crash! Bocas is on lockdown too, so we ate gross pasta with margarine",
      },
    ],
  },
  {
    id: 1,
    title: "Mexico City",
    countries: {
      Mexico: [23.97813580073992, -102.37274631063],
    },
    startDate: "11/21/2020",
    endDate: "11/29/2020",
    entries: [],
  },
  {
    id: 2,
    title: "Kenya – Masai Mara & Mombasa",
    countries: {
      Kenya: [0.5276122780262567, 37.72257049518398],
    },
    startDate: "10/06/2020",
    endDate: "10/13/2020",
    entries: [],
  },
  {
    id: 3,
    title: "Cabo",
    countries: {
      Mexico: [23.97813580073992, -102.37274631063],
    },
    startDate: "08/22/2020",
    endDate: "08/26/2020",
    entries: [],
  },
  {
    id: 4,
    title: "Euro Trip '19-'20",
    countries: {
      Italy: [42.94850225467476, 12.397765908352248],
      Switzerland: [46.81383925830745, 7.860144362895185],
      Liechtenstein: [47.18547253370219, 9.561867684430657],
      Luxembourg: [49.607925779435206, 6.108498172251618],
      France: [46.65654253559255, 2.085942997415801],
    },
    startDate: "12/22/2019",
    endDate: "01/05/2020",
    entries: [],
  },
];
*/

// ACTION CREATORS
export const setTrip = (trip) => ({
  type: SET_TRIP,
  trip,
});

// export const setTrips = (trips) => ({
//   type: SET_TRIPS,
//   trips,
// });

const addTripToReducer = (trip) => ({
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

export const addEntry = (tripId, entry) => ({
  type: ADD_ENTRY,
  tripId,
  entry,
});

// THUNK CREATORS
export const setTrips = (docRef) => {
  return async (dispatch) => {
    try {
      const trips = await docRef.collection("trips");
      const tripsSnapshot = await trips.get();
      tripsSnapshot.forEach((trip) => {
        dispatch(addTripToReducer(trip.data()));
      });
    } catch (error) {
      console.log("There was an error in setTrips thunk:", error);
    }
  };
};

export const addTrip = (docRef, trip) => {
  return async (dispatch) => {
    try {
      // docRef = db.collection("users").doc(user.email)
      // saved as object in user store

      const tripRef = await docRef.collection("trips").doc(trip.title);
      await tripRef.set(trip);
      dispatch(addTripToReducer(trip));
    } catch (error) {
      console.log("There was an error in addTrip thunk:", error);
    }
  };
};

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
    case ADD_ENTRY:
      return {
        ...state,
        single: {
          ...state.single,
          entries: [...state.single.entries, action.entry],
        },
        all: state.all.map((trip) => {
          if (trip.id === action.tripId) {
            trip.entries.push(action.entry);
          }
          return trip;
        }),
      };
    default:
      return state;
  }
}
