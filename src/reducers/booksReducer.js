const INITIAL_STATE = {
  books: {},
  loading: false,
  error: ''
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, books: action.payload };
      case "FETCH ERROR":
        return { ...state, loading: false, error: 'fetch error' };
      default:
        return state;
    }
};
