import React from 'react';

import ListaCategorias from './ListaCategorias';

const Categorias = ({ categorias }) => 
     <select className="form-control form-control-lg">
        {
            categorias.map(categoria => (
                <ListaCategorias
                    key={ categoria.id }
                    categoria={ categoria.categoria }
                />
            ))
        }
    </select>


export default Categorias;