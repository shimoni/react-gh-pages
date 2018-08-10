import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { bookUpdate, bookSave, bookDelete } from './../actions';

class BookCardEdit extends Component {
  state = {
    validTitle: true,
    validAuthors: true,
    titleExist: true,
    validDate: true
  }
  closeModal() {
    this.props.bookUpdate({ prop: 'modal', value: false });
    this.setState({
      validTitle: true,
      validAuthors: true,
      titleExist: true,
      validDate: true
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
    let validation = true;
    let formDate = new Date(this.props.bookCard.publishedDate);
    let today = new Date();
    if(this.props.bookCard.publishedDate == '' || formDate > today){
      console.log('not a date')
      this.setState({
        validDate: false
      });
      validation = false;
    }
    else{
      this.setState({
        validDate: true
      });
    }
    if(this.checkIfTitleExist()){
      this.setState({
        titleExist: false
      });
      validation = false;
    }
    else{
      this.setState({
        titleExist: true
      });
    }
    if(!this.allLetter(this.props.bookCard.authorName)){
      this.setState({
        validAuthors: false
      });
      validation = false;
    }
    else{
      this.setState({
        validAuthors: true
      });
    }

    if(!this.allLetter(this.props.bookCard.title)){
      this.setState({
        validTitle: false
      });
      validation = false;
    }
    else{
      this.setState({
        validTitle: true
      });
    }

      if(validation){
        let myBooksList = Object.assign([],this.props.books.booksList);
        let thisBook = this.props.bookCard;
        myBooksList[thisBook.position] = thisBook;
        console.log('myBooksList',myBooksList);
        this.props.bookSave(myBooksList);
        this.closeModal();
      }


  }

  openNestedModal(){
    this.props.bookUpdate({ prop: 'nestedModal', value: true });
  }

  closeNestedModal(){
    this.props.bookUpdate({ prop: 'nestedModal', value: false });
  }

  deleteBook() {
    let myBooksList = Object.assign([],this.props.books.booksList);
    let thisBook = this.props.bookCard;
    myBooksList.splice(thisBook.position,1)
    for (let i = thisBook.position ; i < myBooksList.length ; i++){
        myBooksList[i] = {...myBooksList[i], position: i };
    }
    this.props.bookDelete(myBooksList);
    this.closeNestedModal();
    this.setState({
      validTitle: true,
      validAuthors: true,
      titleExist: true,
      validDate: true
    });
    this.closeModal();
  }

  allLetter(inputtxt) {
      if(inputtxt == ''){
        return false;
      }
      let letters = /^[ A-Za-z,.]+$/;
      if(inputtxt.match(letters)){
        return true;
      }
      else{
        return false;
      }
  }


  render() {
    const { title, authorName, publishedDate, id, modal, nestedModal } = this.props.bookCard;
    return (
        <Modal isOpen={modal} className={this.props.className} >
          <ModalHeader>Edit book</ModalHeader>
          <ModalBody>
            <Form>
              <Label >Title</Label>
              <Input type="text" invalid={ !this.state.titleExist || !this.state.validTitle} onChange={(e) => this.props.bookUpdate({ prop: 'title', value: e.target.value })} placeholder='My Awesome Book'/>
              <FormFeedback valid={this.state.titleExist}>Same book name is already exist!</FormFeedback>
              <FormFeedback valid={this.state.validTitle}>Only charecthers allowd!</FormFeedback>
              <Label >Author</Label>
              <Input type="text" invalid={!this.state.validAuthors} onChange={(e) => this.props.bookUpdate({ prop: 'authorName', value: e.target.value })} placeholder='Shimoni Lior'/>
              <FormFeedback valid={this.state.validAuthors}>Only charecthers allowd!</FormFeedback>
              <Label >Published date</Label>
              <Input type="date" invalid={!this.state.validDate} onChange={(e) => this.props.bookUpdate({ prop: 'publishedDate', value: e.target.value })} />
              <FormFeedback valid={this.state.validDate}>Please insert valid date!</FormFeedback>
            </Form>
            <Modal isOpen={nestedModal} className={this.props.className}>
              <ModalHeader>Delete book</ModalHeader>
              <ModalBody>Are you sure?</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.deleteBook.bind(this)}>Yes</Button>{' '}
                <Button color="secondary" onClick={this.closeNestedModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.saveBook.bind(this)}>Save book</Button>{' '}
            <Button color="danger" onClick={this.openNestedModal.bind(this)}>Delete book</Button>
            <Button color="secondary" onClick={this.closeModal.bind(this)}>Cancel</Button>
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

export default connect(mapStateToProps, {bookUpdate, bookSave, bookDelete})(BookCardEdit);
