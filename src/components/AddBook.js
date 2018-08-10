import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { bookUpdate, bookSave, bookDelete } from './../actions';

class bookAdd extends Component {
  state = {
    validTitleAdd: true,
    validAuthorsAdd: true,
    titleExistAdd: true,
    validDateAdd: true
  }

  closeAddModal() {
    this.props.bookUpdate({ prop: 'addModal', value: false });
    this.setState({
      validTitleAdd: true,
      validAuthorsAdd: true,
      titleExistAdd: true,
      validDateAdd: true
    });
  }

  checkIfTitleExist(){
    let myBooksList = Object.assign([],this.props.books.booksList);
    let editedTitle = this.props.bookCard.title;
    let titleExist = false;
    for( let i = 0 ; i < myBooksList.length ; i++){
      if (myBooksList[i].title == editedTitle && editedTitle != ''){
        titleExist = true;
      }
    }
    return titleExist;
  }

  saveBook() {
    let validationAdd = true;
    let formDate = new Date(this.props.bookCard.publishedDate);
    let today = new Date();
    if(this.props.bookCard.publishedDate == '' || formDate > today){
      this.setState({
        validDateAdd: false
      });
      validationAdd = false;
    }
    else{
      this.setState({
        validDateAdd: true
      });
    }
    if(this.checkIfTitleExist()){
      this.setState({
        titleExistAdd: false
      });
      validationAdd = false;
    }
    else{
      this.setState({
        titleExistAdd: true
      });
    }
    if(!this.allLetter(this.props.bookCard.authorName)){
      this.setState({
        validAuthorsAdd: false
      });
      validationAdd = false;
    }
    else{
      this.setState({
        validAuthorsAdd: true
      });
    }

    if(!this.allLetter(this.props.bookCard.title)){
      this.setState({
        validTitleAdd: false
      });
      validationAdd = false;
    }
    else{
      this.setState({
        validTitleAdd: true
      });
    }
      if(validationAdd){
        let myBooksList = Object.assign([],this.props.books.booksList);
        let thisBook = this.props.bookCard;
        thisBook['position'] = myBooksList.length;
        thisBook['addModal'] = false;
        thisBook['modal'] = false;
        thisBook['nestedModal'] = false;
        thisBook['id'] = this.makeId();
        myBooksList.push(thisBook);
        this.props.bookSave(myBooksList);
        this.closeAddModal();
      }
  }

  allLetter(inputtxt) {
      let letters = /^[ A-Za-z,.]+$/;
      if(inputtxt == ''){
        return false;
      }
      if(inputtxt.match(letters)){
        return true;
      }
      else{
        return false;
      }
  }

  makeId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  render() {
    const { addModal } = this.props.bookCard;
    return (
        <Modal isOpen={addModal} className={this.props.className} >
          <ModalHeader>Add book</ModalHeader>
          <ModalBody>
            <Form>
              <Label >Title</Label>
              <Input type="text" invalid={ !this.state.titleExistAdd || !this.state.validTitleAdd } onChange={(e) => this.props.bookUpdate({ prop: 'title', value: e.target.value })} placeholder="My Book"/>
              <FormFeedback valid={this.state.titleExistAdd}>Same book name is already exist!</FormFeedback>
              <FormFeedback valid={this.state.validTitleAdd}>Only charecthers allowd!</FormFeedback>
              <Label >Author</Label>
              <Input type="text" invalid={!this.state.validAuthorsAdd} onChange={(e) => this.props.bookUpdate({ prop: 'authorName', value: e.target.value })} placeholder="Shimoni Lior"/>
              <FormFeedback valid={this.state.validAuthorsAdd}>Only charecthers allowd!</FormFeedback>
              <Label >Published date</Label>
              <Input invalid={!this.state.validDateAdd} type="date" onChange={(e) => this.props.bookUpdate({ prop: 'publishedDate', value: e.target.value })} />
              <FormFeedback valid={this.state.validDateAdd}>Please insert valid date!</FormFeedback>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveBook.bind(this)}>Add book</Button>{' '}
            <Button color="secondary" onClick={this.closeAddModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
    bookCard: state.bookCard
  };
};

export default connect(mapStateToProps, {bookUpdate, bookSave, bookDelete})(bookAdd);
