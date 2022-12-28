export const initialState = {
  pos: 0,
  bardist: 0,
  attractMode: false,
  attractTo: 0,
  rounded: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSITION':
      return {
        ...state,
        pos: action.value,
      };
    case 'GET_BARDIST':
      return {
        ...state,
        bardist: action.value,
      };
    case 'GET_ATTRACTMODE':
      return {
        ...state,
        attractMode: action.value,
      };
    case 'GET_ATTRACTTO':
      return {
        ...state,
        attractTo: action.value,
      };
    case 'GET_ROUNDED':
      return {
        ...state,
        rounded: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
