export const GET = 'GET';
export const SET = 'SET';

export function getTheme() {
  return {
    type: GET,
  };
}

export function setTheme() {
  return {
    type: SET,
  };
}
