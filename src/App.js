import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookFetch, bookCreate } from './actions';
import './App.css';
import renderIf from './functions/renderIf';
import BookCard from './components/BookCard';
import { Row, Card, CardTitle, Button, CardText } from 'reactstrap';
import BookCardEdit from './components/BookCardEdit';
import AddBook from './components/AddBook';
import { RingLoader } from 'react-spinners';

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
              {//  <RingLoader loaderStyle={{marginLeft: 'auto', marginRight: 'auto'}} size={200} color={'#123abc'} loading={this.props.loading} />}
              </CardTitle>
              <Row>
                <AddBook />
                <BookCardEdit />

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
