import React, { Component } from 'react';
import './App.css';

class ModifyCatButton extends Component {

    /** Todo, necesito el id de las categorias, ese va a ser el value */
    render() {

        const { handleChange, bookID, categories } = this.props;

        return (



<form>
    <select 
    className="move btn" 
    onChange={handleChange}
    value=""
    id={bookID}>
        <option value="" defaultValue></option>
        <option disabled>Move to...</option>
        {categories.map((categorie) => (
            <option 
            key={categorie.id}
            value={categorie.id}>{categorie.name}</option>
        ))} 
    </select>              
</form>



        );
    }
}

export default ModifyCatButton;