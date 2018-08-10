import _ from 'lodash';
import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Col, CardImgOverlay, CardImg } from 'reactstrap';
import { connect } from 'react-redux';
import { bookUpdate, bookEdit } from './../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import background from './../background.jpg';

class BookCard extends Component {

  onEditPress() {
     _.each(this.props.book, (value, prop) => {
       this.props.bookUpdate({ prop, value });
     });
    // this.props.bookUpdate({ prop: 'modal', value: true });
    this.props.bookEdit();
  }

   toTitleCase(str) {
    let strWithLettersOnly = str.replace(/[^ a-zA-Z]/g, '');
    return strWithLettersOnly.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  renderAuthors(authors){
    if(!Array.isArray(authors))
      return authors+'.';
    let authorsForRender = '';
    for (let i =0 ; i < authors.length ; i++){
      if(i == authors.length - 1){
        authorsForRender += authors[i] +'.';
      }
      else{
        authorsForRender += authors[i] +', ';
      }
    }
    return authorsForRender
  }

  render() {
    const { title, authorName, publishedDate } = this.props.book;
    return (
       <Col xm="auto" xs="auto">
         <Card>
          <CardImg width="100%" src={background} />
          <CardImgOverlay>
          <CardTitle>
            <Button className="float-right" color="light" onClick={this.onEditPress.bind(this)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
              {this.toTitleCase(title)}
           </CardTitle>
           <CardText>
              Authors: <br />
              {this.renderAuthors(authorName)}
           </CardText>
           <CardText>
            <small className="text-muted">Published date: {publishedDate}</small>
          </CardText>
          </CardImgOverlay>
         </Card>
       </Col>

    );
  }
}
const mapStateToProps = (state) => {
  const { authorName, publishedDate, title } = state.bookCard;
  return { authorName, publishedDate, title };
};

export default connect(mapStateToProps, {bookUpdate, bookEdit})(BookCard);
