import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookFetch, bookCreate } from './actions';
import logo from './logo.svg';
import './App.css';
import renderIf from './functions/renderIf';
import BookCard from './components/BookCard';
import { Row, Card, CardTitle, Button, CardImg, CardImgOverlay } from 'reactstrap';
import BookCardEdit from './components/BookCardEdit';
import AddBook from './components/AddBook';

class App extends Component {

  onAddBookPress() {
    this.props.bookCreate();
  }

  componentDidMount(){
    this.props.bookFetch();
  }
  render() {
    return (
        <div>
          <Card body>
              <CardTitle >
                My Books
                <Button className="float-right" onClick={this.onAddBookPress.bind(this)} >Add book</Button>
              </CardTitle>
              <Row>
                <AddBook />
                <BookCardEdit />
                {console.log('state', this.props)}
                {renderIf(this.props.booksList!== [] ,
                    this.props.booksList.map(item =><BookCard key={item.id} book={item}/> ))
                }
              </Row>
          </Card>
        </ div>
    );
  }
}

const mapStateToProps = ({ books }) => {
  const { booksList, loading, error } = books;
  return { booksList, loading, error };
};

export default connect(mapStateToProps, {bookFetch, bookCreate})(App);
