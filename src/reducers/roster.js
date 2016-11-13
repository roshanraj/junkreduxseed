import {
  GET_ROSTER,
  UPDATE_ROSTER,
} from '../actions/roster';

import { loadUserProfile } from '../utils/apiUtils';

const initialState = [
    {
      name:"kk bura",
      count: 2,
      pic: "https://static.intercomassets.com/avatars/666194/square_128/69b02133-ccb6-4564-9bca-f7e27fc999f6-1470677394.jpg?1470677394",
      id: 1
  },
  {
      name:"kk bura",
      count: 2,
      pic: "https://static.intercomassets.com/avatars/666194/square_128/69b02133-ccb6-4564-9bca-f7e27fc999f6-1470677394.jpg?1470677394",
      id: 2
},
  {
      name:"kk bura",
      count: 2,
      pic: "https://static.intercomassets.com/avatars/666194/square_128/69b02133-ccb6-4564-9bca-f7e27fc999f6-1470677394.jpg?1470677394",
      id: 3
  }
]


export default function roster(state = initialState, action) {
  switch (action.type) {
    case GET_ROSTER:
      return [
        state
      ]

    case UPDATE_ROSTER:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]


    default:
      return state
  }
}
