import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js';

class AddBooks extends Component {

    constructor (props) {
        super(props);
        this.state = {
          showBooks: [],
          searchQuery: ""
        }
      }

    findBooks = (query) => {
        if(query !== "") {
            BooksAPI.search(query).then((books) => {
                this.setState({
                    showBooks: books
                    })
            });
        } else {
            this.setState({
                showBooks: [],
                searchQuery: ""
                })
        }
    }
    
      
    handleInputChange = (e) => {
        e.preventDefault();

        this.setState({
            searchQuery: e.target.value
        })

        this.findBooks(e.target.value);
    }

    handleButtonChange = (e) => {
        e.preventDefault();
         const selectedBookId = e.target.name;

         const selectedShelf = e.target.value;

         const selectedBook = (selectedBookId) => 
             this.state.showBooks.find((book) => {
               return book.id === selectedBookId 
             })

              BooksAPI.update(selectedBook(selectedBookId), selectedShelf);
    }

    render() {

        const { shelfList } = this.props;

        return(
            <div>
                <form className="search-container">
                    <input className="search-input" type="text" value={this.state.searchQuery}  onChange={this.handleInputChange} placeholder="Look for books"></input>
                    <div className="search-icon"></div>
                </form>
                <div className="books-list">
                    {this.state.showBooks.length > 0 && this.state.showBooks.map((book) => (
                        <div className="book-item" key={book.id}>
                            <div className="book-image">
                                <img src={book.imageLinks.thumbnail} alt={book.title}/>
                                <select className="move btn" name={book.id} onChange={this.handleButtonChange}>
                                    {shelfList.map((shelf) => {
                                        return <option
                                                    key={shelf}
                                                    value={shelf}                                    
                                                    name={shelf}>{shelf}</option>})}                 
                                </select>  
                            </div>
                            <h3 className="book-title">{book.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AddBooks;