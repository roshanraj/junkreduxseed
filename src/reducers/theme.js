import {
  GET,
  SET,
} from '../actions/theme';

const initialState = {
    online:"#18d073",
    offline: "#444c5a",
    background:"#1c222e",
    pill:"#ff356c",
    selected:"#FFFFFF",
    active:"#EFEFEF",
    color:"#444c5a",
};

export default function alerts(state = initialState, action = {}) {
  switch (action.type) {
  case GET:
  return {state}

  case SET:
    {
      const payload = {type: 'error', message: 'Socket connection error.', time: new Date().toString()};
      const alerts = state.alerts || [];
      return Object.assign({}, state, {hasError: true}, {alerts: [payload, ...alerts]});
    }

  default:
    return state;
  }
}
