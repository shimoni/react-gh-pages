const INITIAL_STATE = {
  booksList: [],
  loading: false,
  error: ''
 };

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, booksList: action.payload, loading: false };
      case "FETCH ERROR":
        return { ...state, loading: false, error: 'fetch error' };
      case "BOOK_LIST_UPDATE":
        return { ...state, booksList: action.payload};
      default:
        return state;
    }
};
