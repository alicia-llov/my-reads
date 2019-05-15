import React, { Component } from 'react';
import './App.css';

class ModifyCatButton extends Component {

    handleChange = (e) => {
        e.preventDefault();
        const { updateShelf, currentBook} = this.props;
        updateShelf(currentBook, e.target.value);

    }

    /** Todo, necesito el id de las categorias, ese va a ser el value */
    render() {

        const {shelfList, currentBookShelf } = this.props;

        return (
                <select className="move btn" onChange={this.handleChange} value={ currentBookShelf }>
                    {shelfList.map((shelf) => {
                            return <option
                                        key={shelf}
                                        value={shelf}                                    
                                        name={shelf}>{shelf}</option>})}                 
                </select>              
        );
    }
}

export default ModifyCatButton;