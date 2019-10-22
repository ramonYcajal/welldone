import React, { Fragment } from 'react';

import ListaArticulosEdicion from './ListaArticulosEdicion';

const Productos = ({ articulos }) => {
    return(
        <Fragment>
            <h1 className="text-center">Artículos</h1>
            <ul className="list-group mt-5">
                {articulos.map(articulo => (
                    <ListaArticulosEdicion
                        key={ articulo.id }
                        articulo={ articulo }
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Productos;