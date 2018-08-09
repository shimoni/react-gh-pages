import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bookUpdate, bookSave, bookDelete } from './../actions';

class bookAdd extends Component {

  closeAddModal() {
    this.props.bookUpdate({ prop: 'addModal', value: false });
  }

  makeId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  saveBook() {
    let myBooksList = Object.assign([],this.props.books.booksList);
    let thisBook = this.props.bookCard;
    thisBook['position'] = myBooksList.length;
    thisBook['addModal'] = false;
    thisBook['modal'] = false;
    thisBook['id'] = this.makeId();
    myBooksList.push(thisBook);
    this.props.bookSave(myBooksList);
    this.closeAddModal();
  }



  render() {
    const { title, authorName, publishedDate, id, addModal } = this.props.bookCard;
    return (
        <Modal isOpen={addModal} className={this.props.className} >
          <ModalHeader>Add book</ModalHeader>
          <ModalBody>
            <Form>
              <Label >Title</Label>
              <Input type="text" onChange={(e) => this.props.bookUpdate({ prop: 'title', value: e.target.value })} placeholder="My Book"/>
              <Label >Author</Label>
              <Input type="text" onChange={(e) => this.props.bookUpdate({ prop: 'authorName', value: e.target.value })} placeholder="Shimoni Lior"/>
              <Label >Published date</Label>
              <Input valid={true} type="date" onChange={(e) => this.props.bookUpdate({ prop: 'publishedDate', value: e.target.value })} />
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
