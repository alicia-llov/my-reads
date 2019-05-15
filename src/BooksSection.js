import React, { Component } from 'react';
import './App.css';
import ModifyCatButton from './ModifyCatButton.js';

class BooksSection extends Component {

    render() {

        const { booksByShelf, shelfList, shelfTitle, updateShelf } = this.props;

        return (
            <div className="container">
                <div className="book-section">
                    <h2 className="section-title">{shelfTitle}</h2>           
                    <div className="books-list">
                        {booksByShelf.map((book) => (
                            <div key={book.id} className="book-item">
                                <div className="book-image">
                                    <img src={book.imageLinks.thumbnail} alt={book.title}/>
                                    <ModifyCatButton
                                        shelfList={shelfList}
                                        currentBookShelf={book.shelf}
                                        currentBook={book}
                                        updateShelf={updateShelf} /> 
                                </div>
                                <h3 className="book-title">{book.title}</h3>
                            </div>
                        ))}                        
                    </div>
                </div>             
            </div>
        );
    }
}

export default BooksSection;
