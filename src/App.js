import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as BooksAPI from './BooksAPI.js';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      books: [],
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

  render() {

    const {books} = this.state;

    return (
      <div className="App">
          {books.map((book) => (
            <div>{book.title}</div>
          ))}
      </div>
    );
  }
}

export default App;
