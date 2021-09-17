import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Axios from "axios";
import * as bookAction from '../actions/book.action';
import AnonymousNavbarClass from '../containers/anonymousNavbar.container';
import '../App.css';

class Anonymous extends React.Component {
    constructor(props) {
        super(props);
        this.getTitle = this.getTitle.bind(this);
        this.getId = this.getId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          title: '',
          id: ''
        };
    }

    componentDidMount() {
        this.props.clearBooks();
        console.log('mounted!');
    }

    getTitle(e){
      this.setState({
        title: e.target.value
      })
      
    }

    getId(e){
      this.setState({
        id: e.target.value
      })
      
    }

    handleSubmit(e){
      e.preventDefault();
      this.props.clearBooks();
      if (this.state.title.length === 0 && this.state.id.length === 0) {
        this.props.getBooks();
      } else {
        if (this.state.id.length !== 0) {
          this.props.getBooksById(this.state.id);
        } else {
            this.props.getBooksByTitle(this.state.title);
        }
      }
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

    _renderBookNames() {
      if (this.props.books.length === 0) {
        return null;
      } else {
        return (
          <div>
            <h2>Search results:</h2>
            {this.props.books.map((book, i) => 
              (
                <ul id='list' key={i}>
                  <li>
                    <label className='titles' key={'title' + i}>{book.title}</label>
                    <br/>
                    <label className='authors' key={'author' + i}>{this._listAuthors(book.authors)}</label>
                    <br/>
                    <label className='authors' key={'id' + i}>ID# {book.id}</label>
                    <br/>                
                    <Link to={"/seereviews/" + book.id} className="btn btn-primary">See Reviews</Link>
                  </li>
                </ul>
              )
            )}
          </div>
        )
      }
    }

    render() {
      const renderedBooks = this._renderBookNames();

      return (
        <div>
          <div>
            <AnonymousNavbarClass />
            <br/>
            <br/>
            <br/>
            <div id='body'>
              <h2>Welcome to Buku App, the most advanced book review database in the world!</h2>
              
              <h6>Please start by searching the book below, or login/register for more features.</h6>
              <br/>
              <form onSubmit={this.handleSubmit}>
                <label>Please input book's title:</label>
                <br/>
                <input id='textbox' type="text" onChange={this.getTitle} className="form-control" value={this.state.title}/><br />
                <label>Please input book's ID:</label>
                <br/>
                <input id='textbox' type="text" onChange={this.getId} className="form-control" value={this.state.id}/><br />
                <input id='button' type="submit" className="btn btn-success" value="Search"/>
              </form>
            </div>
            <br/>
            <br/>
            <div id='body'>
              {renderedBooks}
            </div>
          </div>
        </div>
      );
    }
}

let mapDispatchToProps = function (dispatch, props) {
  return {
    getBooks: () => {dispatch(bookAction.getBooks())},
    getBooksByTitle: (title) => {dispatch(bookAction.getBooksByTitle(title))},
    getBooksById: (id) => {dispatch(bookAction.getBooksById(id))},
    clearBooks: () => {dispatch(bookAction.clearBooks())},
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.book
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anonymous);