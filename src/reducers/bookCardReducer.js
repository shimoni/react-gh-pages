const INITIAL_STATE = {
  id: '',
  authorName: '',
  publishedDate: '',
  title: '',
  modal: false,
  addModal: false,
  nestedModal: false
 };

export default (state = INITIAL_STATE, action) => {
    console.log('my action', action);
    switch (action.type) {
      case "BOOK_UPDATE":
        return { ...state,[action.payload.prop]: action.payload.value };
      case "ADD_BOOK":
        return {...INITIAL_STATE, addModal: true };
      default:
        return state;
    }
};
