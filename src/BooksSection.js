import React, { Component } from 'react';
import './App.css';

class BooksSection extends Component {

    render() {

        const { Books } = this.props;

        return (
            <div className="container">
                <div className="book-section">
                    <h2 className="section-title">- Dependently Category title -</h2>
                    <div className="books-list">
                        {Books.map((book) => (
                            <div className="book-item">
                                <div className="book-image">
                                    <img src={book.imageLinks.smallThumbnail} />
                                    <button className="move btn">*</button>
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
