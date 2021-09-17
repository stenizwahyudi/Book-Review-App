import React from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import {getMyReviews, selectReview} from '../actions/userReview.action';
import IdentifiedNavbarClass from '../containers/identifiedNavbar.container';

class UserReview extends React.Component {

    componentDidMount() {
        this.props.getMyReviews(this.props.status._id);
    }

    render() {
        if (this.props.loading) {
            return (
                <div>
                    <IdentifiedNavbarClass />
                    <br/>
                    <br/>
                    <br/>
                    <h3>Loading...</h3>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <IdentifiedNavbarClass />
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div id='body'>
                    <div>{this._renderReviewList()}</div>
                </div>
            </div>

        );
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

    _renderReviewList() {
        if (this.props.reviews.length === 0) {
            return (
                <div id='body'>
                    <h2>You haven't reviewed anything yet...</h2>
                </div>
            )
        }

        if (this.props.redirectPage) {
            return (<Redirect to={this.props.redirectPage}/>);
        }
        
        return (
          <div id='body'>
            <div><h2>Your Reviews:</h2></div>
            <br/>
            <div>
                {this.props.reviews.map((review, i) => 
                  (
                    <ul id='list' key={i}>
                      <li>
                        <label className='titles' key={'title' + i}>{review.title}</label>
                        <br/>
                        <label className='authors' key={'author' + i}>{this._listAuthors(review.authors)}</label>
                        <br/>
                        <label className='rating' key={'rating' + i}>Rating: {review.rating} / 5</label>
                        <br/>
                        <label>Written Review:</label>
                        <br/>
                        <label className='review' id='review' key={'review' + i}>{review.review}</label>
                        <br/>
                        <button onClick={(e) => this._selectReview(e, review)} className="btn btn-primary">
                            Edit
                        </button>
                      </li>
                    </ul>
                  )
                )}
            </div>
          </div>
        )   
    }

    _selectReview(e, review) {
        e.preventDefault();
        this.props.selectReview(review)
    }
}



function mapDispatchToProps(dispatch, props) {
    return {
        getMyReviews: (name) => dispatch(getMyReviews(name)),
        selectReview: (data) => dispatch(selectReview(data)),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.userReview,
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserReview)