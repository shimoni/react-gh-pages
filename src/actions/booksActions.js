export const bookFetch = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_REQUEST"});

    const URL = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
    return fetch(URL, { method: 'GET'})
       .then( response => {
         dispatch({type: "FETCH_SUCCESS", payload: response.json})
         console.log(response));
       };
  };
};
