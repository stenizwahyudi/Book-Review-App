import React from "react";
import {connect} from 'react-redux';
import {getReviews} from '../actions/connect.action'
import ConnectNavbarClass from '../containers/connectNavbar.container';

class Connect extends React.Component {


    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getReviews(id);
    }

    render() {
        if (this.props.loading) {
            return (
                <div>
                    <ConnectNavbarClass />
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
                    <ConnectNavbarClass />
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

    _displayName(data) {
        let name = data.name;
        if (data.expert === true) {
            name = '*' + name + '*'
        }
        return name;
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
                <h2>Sorry, this book hasn't been reviewed yet :(</h2>
            );
        }
        return (
          <div>
            <div>
                <h3>{this.props.reviews[0].title}</h3>
                <h5 className='authors'>{this._listAuthors(this.props.reviews[0].authors)}</h5>
                <br/>
            </div>
            <div>
                {this.props.reviews.map((review, i) => 
                  (
                    <ul id='list' key={i}>
                      <li>
                        <label className='titles' key={'username' + i}>{this._displayName(review)}</label>
                        <br/>
                        <label className='rating' key={'rating' + i}>Rating: {review.rating} / 5</label>
                        <br/>
                        <label>Written Review:</label>
                        <br/>
                        <label id='review' key={'review' + i}>{review.review}</label>
                        <br/>
                      </li>
                    </ul>
                  )
                )}
            </div>
          </div>
        )   
    }
}



function mapDispatchToProps(dispatch, props) {
    return {
        getReviews: (id) => dispatch(getReviews(id)),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.connection,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Connect)