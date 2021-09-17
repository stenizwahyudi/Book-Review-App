import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router";
import * as userReviewAction from '../actions/userReview.action';
import {getBooksById} from '../actions/book.action';
import ConnectNavbarClass from '../containers/connectNavbar.container';

class WriteReview extends React.Component {
    constructor(props) {
        super(props);
        this.getRating = this.getRating.bind(this);
        this.getReview = this.getReview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          title: '',
          authors: [],
          name: '',
          id: '',
          rating: '',
          review: '',
          expert: false,
          userId: '',
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getBooksById(id);
        this.setState({name: this.props.username, id: id, rating: '', review: '', expert: this.props.status.expert, userId: this.props.status._id});
    }

    getRating(e){
      this.setState({
        rating: e.target.value,
        title: this.props.books[0].title,
        authors: this.props.books[0].authors
      })
    }

    getReview(e){
      this.setState({
        review: e.target.value
      })
      
    }

    handleSubmit(e){
      e.preventDefault();
      this.props.addReview(this.state);
    }

    _listAuthors(names) {
      let nameList = '';
      if (names !== undefined) {
        nameList = 'by: ';
        for (let i = 0; i < names.length; i++) {
          if (i === names.length - 1) {
            nameList = nameList.concat(names[i]);
          } else {
            nameList = nameList.concat(names[i] + ', ');
          }
        }
      }
      return nameList;
    }

    render() {
      if (this.props.redirectPage) {
          return (<Redirect to={this.props.redirectPage}/>);
      }
      
      return (
        <div>
          <div>
            <ConnectNavbarClass />
            <br/>
            <br/>
            <br/>
            <div id='body'>
              <h2>Start your review below:</h2>
              <br/>
              <label className='titles'>{this.props.books[0].title}</label>
              <br/>
              <label className='authors'>{this._listAuthors(this.props.books[0].authors)}</label>
              <form onSubmit={this.handleSubmit}>
                <label>Book's rating:</label>
                <br/>
                <input type="number" id='textbox' min="1" max="5" onChange={this.getRating} className="form-control" value={this.state.rating} required/><br />
                <label>Your review:</label>
                <br/>
                <textarea id='textarea' rows="4" cols="50" onChange={this.getReview} className="form-control" value={this.state.review}></textarea><br />
                <input id='button' type="submit" className="btn btn-primary" value="Post Review"/>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

let mapDispatchToProps = function (dispatch, props) {
  return {
    addReview: (review) => {dispatch(userReviewAction.addReview(review))},
    getBooksById: (id) => {dispatch(getBooksById(id))},
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.userReview,
    ...state.user,
    books: state.book.books,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WriteReview);