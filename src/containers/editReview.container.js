import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as userReviewAction from '../actions/userReview.action';
import {getBooksById} from '../actions/book.action';
import ConnectNavbarClass from '../containers/connectNavbar.container';

class EditReview extends React.Component {
    constructor(props) {
        super(props);
        this.getRating = this.getRating.bind(this);
        this.getReview = this.getReview.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          id: '',
          userId: '',
          rating: '',
          review: '',
        };
    }

    componentDidMount() {
        console.log('here');
        this.props.clearRedirect();
        this.setState({userId: this.props.review.userId, id: this.props.review.id, rating: "", review: ""});
    }

    getRating(e){
      this.setState({
        rating: e.target.value,
      })
    }

    getReview(e){
      this.setState({
        review: e.target.value
      })
      
    }

    handleSubmit(e){
      e.preventDefault();
      this.props.editReview(this.state);
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

      if (this.props.review) {
          return (
            <div>
              <div>
                <ConnectNavbarClass />
                <br/>
                <br/>
                <br/>
                <div id='body'>
                  <div>
                    <h2>Your original review:</h2>
                    <br/>
                    <label className='titles'>{this.props.review.title}</label>
                    <br/>
                    <label className='authors'>{this._listAuthors(this.props.review.authors)}</label>
                    <br/>
                    <label>Rating: {this.props.review.rating} / 5</label>
                    <br/>
                    <label>Review:</label>
                    <br/>
                    <label id='review'>{this.props.review.review}</label>
                    <br/>
                    <button onClick={(e) => this._delete(e)} className="btn btn-danger">
                        Delete Review
                    </button>
                    <br/>
                    <br/>
                    <h2>Your update review:</h2>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <label>Book's rating:</label>
                    <br/>
                    <input type="number" id='textbox' min="1" max="5" onChange={this.getRating} className="form-control" value={this.state.rating} required/><br />
                    <label>Your review:</label>
                    <br/>
                    <textarea id='textarea' rows="4" cols="50" onChange={this.getReview} className="form-control" value={this.state.review}></textarea><br />
                    <input id='button' type="submit" className="btn btn-primary" value="Update Review"/>&nbsp;
                    <Link to={"/yourreviews/"} className="btn btn-danger">Cancel</Link>
                  </form>
                </div>
              </div>
            </div>
          );
      }
      return (
          <div>
              <ConnectNavbarClass />
          </div>
      )
    }

    _delete(e) {
        e.preventDefault();
        this.props.deleteReview(this.props.review._id)
    }

}

let mapDispatchToProps = function (dispatch, props) {
  return {
    editReview: (data) => {dispatch(userReviewAction.editReview(data))},
    clearRedirect: () => {dispatch(userReviewAction.clearRedirect())},
    deleteReview: (objectId) => dispatch(userReviewAction.deleteReview(objectId)),
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.userReview,
    ...state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditReview);