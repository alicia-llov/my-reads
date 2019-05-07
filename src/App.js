import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI.js';
import BooksSection from './BooksSection.js';
import ModifyCatButton from './ModifyCatButton.js';

const categories = [
        {
          id: 1,
          name: "Currently Reading"
        },
        {
          id: 2,
          name: "Want to Read"
        },
        {
          id: 3,
          name: "Finished Reading"
        }
        ]

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      books: [],
      booksByCat: {
        1: [],
        2: [],
        3: []
      }
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

  /* Función que me convierta el array de objects en un object con [id] = object
     Esta función la voy a utilizar para el handleChange, cuando traiga el bookID lo utilizo para coger ese valor y hacer un push en la cat*/
  bookRearrange = (array) => 
    array.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {})




  /* Function for creating booksByCategorie object 
    Este es el objeto que voy a utilizar para pintar
    Aquí voy a declarar la función que me va a recoger el valor del select --> y me va a enviar el categorie, y el book-id

    Necesito: los props que me llegarán del hijo: el id de la cat y el id del book.
    Tengo que coger bookID, recorrer el books y coger el objeto que coindica con el key. 

    Para crear el objeto:
    Primero recorro el objeto booksByCat con el id de la cat. Si no existe el id de la categoría --> Creo el key desde el id de la categoria e introduzco el object book,
    Si existe introduzco el bookObject en el cat.books con un push.
  */


  handleChange = event => {
    event.preventDefault();

    const categorieID = event.target.value;
    const bookID = event.target.id;
    const bookRearrange = this.bookRearrange(this.state.books);
    
    this.setState( prevState => ({
      booksByCat: {...prevState.booksByCat,
                  [categorieID]: this.state.booksByCat[categorieID].concat(bookRearrange[bookID]) }
    }))
  }
  


  render() {

    const {books, booksByCat} = this.state;

    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1 className="main-title">My Reading List</h1>
          </div>
        </div>

        <div className="container">
                <div className="book-section">
                    <h2 className="section-title">- Temporal All Books Section -</h2>
                    <div className="books-list">
                        {books.map((book) => (
                            <div className="book-item" key={book.id}>
                                <div className="book-image">
                                    <img src={book.imageLinks.smallThumbnail} />
                                    <ModifyCatButton 
                                      handleChange={this.handleChange}
                                      bookID={book.id}
                                      categories={categories}
                                    />     
                                </div>
                                <h3 className="book-title">{book.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>             
            </div>
        <button className="add btn">+</button>
      </div>
    );
  }
}

export default App;
