import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI.js';
import BooksSection from './BooksSection.js';
import ModifyCatButton from './ModifyCatButton.js';
import AddBooks from './AddBooks.js'

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
      },
      screen: 'book-list'
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


  /* Function for creating booksByCategorie object: VER SI ES NECESARIO HACERLO SIQUIERA
  Para crearlo dinámicamente:
  Voy a coger todos los id de categories y los voy a meter en un array.
  Iterar por ese array, y cada uno de los valores del array va a ser el [key]: value an empty array.  */



   /* 
    Aquí voy a declarar la función que me va a recoger el valor modify button --> y me va a enviar el categorie, y el book-id

    Necesito: los props que me llegarán del hijo: el id de la cat y el id del book.
    Tengo que coger bookID, recorrer el books y coger el objeto que coindica con el key. 
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

  /** Función que va a pintar las diferentes categorías siempre y cuando haya al menos un elemento en el array. 
   * Antes de cada título...
                          * Esto tiene que ir por booksByCat
                          * Vas al primer booksbycat...
                          * si está vacío..no pintas nada
                          * si está lleno, el título lo coges matcheando: el key en el que se encuentra con 
                          * 
                          * 
  * Tengo que acabar pasándole un catID y un bookID
                      */
  
bookSection = (categories) => {
 const catInfo = categories.map((categorie) => (
    Object.values(categorie)
 ))

 const catID = categories.map((categorie) => (
   this.state.booksByCat[categorie.id].length > 0
   
 ))
 console.log("categorie", catID)
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
                    <h2 className="section-title">- Add Books to your lists! -</h2>
                    {/* Esto será la página aparte con react router */}

                      <AddBooks
                        allBooks={books}
                        categories={categories}
                        handleChange={this.handleChange} />

                      {/**  Antes de cada título...
                          * Esto tiene que ir por booksByCat
                          * Vas al primer booksbycat...
                          * si está vacío..no pintas nada
                          * si está lleno, el título lo coges matcheando: el key en el que se encuentra con 
                      */}

                      {categories.map((categorie) => (
                        this.state.booksByCat[categorie.id] === this.state.booksByCat[categorie.id].length > 0 && <div>hola</div>
                      ))}

                      {/**<BooksSection
                        booksByCat={booksByCat}
                        categorie={categorie}
                        handleChange={this.handleChange} />*/}

                        {console.log("categorieFun", this.bookSection(categories))}
                </div>             
            </div>
        <button className="add btn">+</button>
      </div>
    );
  }
}

export default App;
