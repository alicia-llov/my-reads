import React, { Component } from 'react';
import ModifyCatButton from './ModifyCatButton.js'

class AddBooks extends Component {
    render() {

        const {allBooks, categories, handleChange} = this.props;
        
        return(
            <div className="books-list">
                 {allBooks.map((book) => (
                    <div className="book-item" key={book.id}>
                        <div className="book-image">
                            <img src={book.imageLinks.smallThumbnail} />
                            <ModifyCatButton 
                                handleChange={handleChange}
                                bookID={book.id}
                                categories={categories}
                            />     
                        </div>
                        <h3 className="book-title">{book.title}</h3>
                    </div>
                ))}
            </div>
        );
    }
}

export default AddBooks;