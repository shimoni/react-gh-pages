const INITIAL_STATE = {
  id: '',
  authorName: '',
  publishedDate: '',
  title: '',
  position: '',
  modal: false,
  addModal: false,
  nestedModal: false
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "BOOK_EDIT":
        return {...state, modal: true, authorName: '', publishedDate: '', title: '' }
      case "BOOK_UPDATE":
        return { ...state,[action.payload.prop]: action.payload.value };
      case "ADD_BOOK":
        return {...INITIAL_STATE, addModal: true };
      default:
        return state;
    }
};
