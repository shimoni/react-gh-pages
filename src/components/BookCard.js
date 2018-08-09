import _ from 'lodash';
import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bookUpdate } from './../actions';

class BookCard extends Component {

  onEditPress() {
    _.each(this.props.book, (value, prop) => {
      this.props.bookUpdate({ prop, value });
    });
  }

  render() {
    const { title, authorName, publishedDate } = this.props.book;
    return (
       <Col sm="3">
         <Card body>
           <CardTitle>{title}</CardTitle>
           <CardText>{authorName}</CardText>
           <CardText>
            <small className="text-muted">Published date: {publishedDate}</small>
          </CardText>
           <Button onClick={this.onEditPress.bind(this)}>Edit book</Button>
         </Card>
       </Col>

    );
  }
}
const mapStateToProps = (state) => {
  const { authorName, publishedDate, title } = state.bookCard;
  return { authorName, publishedDate, title };
};

export default connect(mapStateToProps, {bookUpdate})(BookCard);
