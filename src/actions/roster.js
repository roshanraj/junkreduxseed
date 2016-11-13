export const GET_ROSTER = 'GET_ROSTER';
export const UPDATE_ROSTER = 'UPDATE_ROSTER';

function getRoster() {
  return {
    type: GET_ROSTER,
  };
}

function updateRoster(payload) {

  return {
    type: UPDATE_ROSTER,
    roster: payload,
  };
}
