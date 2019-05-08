import React, { Component } from 'react';
import './App.css';
import ModifyCatButton from './ModifyCatButton.js';

class BooksSection extends Component {

    render() {



        const { booksByCat, categorie, handleChange} = this.props;

        return (
            <div className="container">
                <div className="book-section">
                    <h2  key={categorie.id} className="section-title">{categorie.name}</h2>           
                    <div className="books-list">
                        {/*booksByCat.map((book) => (
                            <div className="book-item">
                                <div className="book-image">
                                    <img src={book.imageLinks.smallThumbnail} />
                                    <ModifyCatButton
                                        handleChange={handleChange}
                                        bookID={book.id}
                                        categories={categories} />
                                </div>
                                <h3 className="book-title">{book.title}</h3>
                            </div>
                        ))*/}                        
                    </div>
                </div>             
            </div>
        );
    }

}

export default BooksSection;
