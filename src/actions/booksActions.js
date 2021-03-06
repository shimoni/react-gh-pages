let myBooks = [];

export const bookFetch = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_REQUEST"});
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=react`)
       .then(response => response.json())
       .then(response =>  {
          if(myBooks.length > 0){
            myBooks = [];
          }
          let counter = 0;
          response.items.forEach( (book) => {
            myBooks.push({
              id: book.id,
              authorName: book.volumeInfo.authors,
              publishedDate: book.volumeInfo.publishedDate,
              title: book.volumeInfo.title,
              modal: true,
              addModal: false,
              nestedModal: false,
              position: counter
            });
            counter = counter + 1;
          });
          dispatch({type: "FETCH_SUCCESS", payload: myBooks})});
  };
};

export const bookUpdate = ({ prop, value }) => {
  return {
    type: "BOOK_UPDATE",
    payload: { prop, value }
  };
};

export const bookEdit = () => {
  return {
    type: "BOOK_EDIT",
  };
};

export const bookSave = (booksList) => {
  return {
    type: "BOOK_LIST_UPDATE",
    payload: booksList
  };
};

export const bookCreate = (booksList) => {
  return {
    type: "ADD_BOOK",
  };
};

export const bookDelete = (booksList) => {
  return {
    type: "BOOK_LIST_UPDATE",
    payload: booksList
  };
};
