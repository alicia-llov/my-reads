import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI.js';
import BooksSection from './BooksSection.js';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      books: [],
      categories: {
        currentlyReading: [],
        wantToRead: [],
        finished: [],
      },
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

    const {books, categories} = this.state;

    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1 className="main-title">My Reading List</h1>
          </div>
        </div>

        <BooksSection Books={books}/>

        <button className="add btn">+</button>

      </div>
    );
  }
}

export default App;
