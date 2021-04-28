// ACTION TYPES
const SET_TRIP = "SET_TRIP";
const SET_TRIPS = "SET_TRIPS";
const ADD_TRIP = "ADD_TRIP";
const DELETE_TRIP = "DELETE_TRIP";
const EDIT_TRIP = "EDIT_TRIP";

// temp data
const myTrips = [
  {
    id: 0,
    title: "Panama City & Bocas del Toro",
    countries: {
      Mexico: [8.591203331991537, -80.23045274204661],
    },
    startDate: "01/01/2021",
    endDate: "01/07/2021",
  },
  {
    id: 1,
    title: "Mexico City",
    countries: {
      Mexico: [23.97813580073992, -102.37274631063],
    },
    startDate: "11/21/2020",
    endDate: "11/29/2020",
  },
  {
    id: 2,
    title: "Kenya – Masai Mara & Mombasa",
    countries: {
      Kenya: [0.5276122780262567, 37.72257049518398],
    },
    startDate: "10/06/2020",
    endDate: "10/13/2020",
  },
  {
    id: 3,
    title: "Cabo",
    countries: {
      Mexico: [23.97813580073992, -102.37274631063],
    },
    startDate: "08/22/2020",
    endDate: "08/26/2020",
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
  },
];

// ACTION CREATORS
export const setTrip = (trip) => ({
  type: SET_TRIP,
  trip,
});

export const setTrips = () => ({
  type: SET_TRIPS,
  trips: myTrips,
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
