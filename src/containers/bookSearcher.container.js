import React from 'react';
import { connect } from 'react-redux';
import Axios from "axios";
import * as bookAction from '../actions/book.action';
import ConnectNavbarClass from '../containers/connectNavbar.container';

class BookSearcher extends React.Component {
    constructor(props) {
        super(props);
        this.getTitle = this.getTitle.bind(this);
        this.getAuthor = this.getAuthor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          title: '',
          author: '',
          books: [],
        };
    }

    getTitle(e){
      this.setState({
        title: e.target.value
      })
      
    }

    getAuthor(e){
      this.setState({
        author: e.target.value
      })
      
    }

    handleSubmit(e){
      e.preventDefault();
      this.setState({
        books: []
      })
      let url;
      let apiKey = process.env.REACT_APP_GOOGLE_BOOKS_KEY;
      if (this.state.title.length !== 0 && this.state.author.length !== 0) {
        url = 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.title + '+inauthor:' + this.state.author + '&key=' + apiKey;
      } else if (this.state.title.length === 0 && this.state.author.length === 0) {
        url = '';
      } else {
        if (this.state.title.length === 0) {
          url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + this.state.author + '&key=' + apiKey;
        } else if (this.state.author.length === 0) {
          url = 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.title + '&key=' + apiKey;
        }
      }
      if (url !== '') {
        Axios.get(url)
              .then(response => {
                  return response.data.items.map(item => item);
              })
              .then(books => {
                this.setState({
                  books
                });
                return books;
              })
              .catch(function() {
                alert("Sorry, no book is found :(");
              });
      } else {
        alert("Please input the title, the author(s), or both");
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
      if (this.state.books.length === 0) {
        return null;
      } else {
        return (
          <div>
            <h2>Top 10 search results of your books:</h2>
            {this.state.books.map((book, i) => 
              (
                <ul id='list' key={i}>
                  <li>
                    <label className='titles' key={'title' + i}>{book.volumeInfo.title}</label>
                    <br/>
                    <label className='authors' key={'author' + i}>{this._listAuthors(book.volumeInfo.authors)}</label>
                    <br/>
                    <button onClick={(e) => this.addBook(e, book)} className="btn btn-success">
                      Add Book
                    </button>
                  </li>
                </ul>
              )
            )}
          </div>
        )
      }
    }

    addBook(e, book){
      e.preventDefault();
      let book1 = {};
      book1.title = book.volumeInfo.title;
      book1.authors = book.volumeInfo.authors;
      book1.id = book.id
      this.props.addBook(book1);
    }

    render() {
      const renderedBooks = this._renderBookNames();

      return (
        <div>
          <div>
            <ConnectNavbarClass />
            <br/>
            <br/>
            <br/>
            <div id='body'>
              <form onSubmit={this.handleSubmit}>
                <label>Please input book's title:</label>
                <br/>
                <input id='textbox' type="text" onChange={this.getTitle} className="form-control" value={this.state.title}/><br />
                <label>Please input book's author(s):</label>
                <br/>
                <input id='textbox' type="text" onChange={this.getAuthor} className="form-control" value={this.state.author}/><br />
                <input id='button' type="submit" className="btn btn-primary" value="Search"/>
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
    addBook: (book) => {dispatch(bookAction.addBook(book))},
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
)(BookSearcher);