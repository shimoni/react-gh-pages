import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bookUpdate, bookSave, bookDelete } from './../actions';

class BookCardEdit extends Component {

  closeModal() {
    this.props.bookUpdate({ prop: 'modal', value: false });
  }

  saveBook() {
    let myBooksList = Object.assign([],this.props.books.booksList);
    let thisBook = this.props.bookCard;
    myBooksList[thisBook.position] = thisBook;
    this.props.bookSave(myBooksList);
    this.closeModal();
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
  }

  render() {
    const { title, authorName, publishedDate, id, modal, nestedModal } = this.props.bookCard;
    return (
        <Modal isOpen={modal} className={this.props.className} >
          <ModalHeader>Edit book</ModalHeader>
          <ModalBody>
            <Form>
              <Label >Title</Label>
              <Input type="text" onChange={(e) => this.props.bookUpdate({ prop: 'title', value: e.target.value })} placeholder={title}/>
              <Label >Author</Label>
              <Input type="text" onChange={(e) => this.props.bookUpdate({ prop: 'authorName', value: e.target.value })} placeholder={authorName}/>
              <Label >Published date</Label>
              <Input valid={true} type="date" onChange={(e) => this.props.bookUpdate({ prop: 'publishedDate', value: e.target.value })} placeholder ={publishedDate}/>
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
