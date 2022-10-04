const initialState = {
  data: [],
  gridData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESSFUL':
      return {
        ...state,
        data: action.payload,
        gridData: action.payload,
      };
    case 'FILTER_GENDER':
      return {
        ...state,
        gridData: state.data.filter((g) => g.Gender === action.payload),
      };
    case 'REMOVE_FILTER_GENDER':
      return {
        ...state,
        gridData: state.data,
      };
    default:
      return state;
  }
};

export default reducer;
