import React from 'react';

const ListaCategorias = ({ categoria }) => {

    return(

                <option value={ categoria.id }>{ categoria.nombre }</option>

       
        
    )
}

export default ListaCategorias;