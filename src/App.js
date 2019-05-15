import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI.js';
import BooksSection from './BooksSection.js';
import AddBooks from './AddBooks.js'


class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      books: []
    }
  }

  async componentDidMount() {
    this.getBookList();
  }

  getBookList = async() => {
    const allBooks = await BooksAPI.getAll();
    this.setState({
      books: allBooks
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    book.shelf = shelf;

    this.setState({
        books: this.state.books
      });
  }

  booksByShelf = (books, shelf) => 
    books.filter((book) => {
      return book.shelf === shelf
  })
  

  render() {

    const { books } = this.state;
    const shelfList = ["currentlyReading", "wantToRead", "read"];
  
    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1 className="main-title">My Reading List</h1>
          </div>
        </div>

        <div className="container">
          <Route exact path="/" render={() => {
          return  <div className="book-section">
              <BooksSection
                booksByShelf={this.booksByShelf(books, "currentlyReading")}
                shelfList={shelfList}
                shelfTitle="Currently Reading"
                updateShelf={this.updateShelf} />

              <BooksSection
                booksByShelf={this.booksByShelf(books, "wantToRead")}
                shelfList={shelfList}
                shelfTitle="Want to read"
                updateShelf={this.updateShelf} />

              <BooksSection
                booksByShelf={this.booksByShelf(books, "read")}
                shelfList={shelfList}
                shelfTitle="Finished Reading"
                updateShelf={this.updateShelf} />  
              <Link 
                to='/add-books'
                className="add btn">Search</Link>
              </div>}} />

          <Route path='/add-books' render={() => {
            return <div className="book-section">
               <AddBooks
                  allBooks={books}
                  shelfList={shelfList}
                  updateShelf={this.updateShelf} />
              <Link 
                to='/'
                className="add btn">Back</Link>
                 </div>
           }} />
          
          </div>
      </div>
    );
  }
}

export default App;
