import React, { Fragment } from 'react';

import ListaArticulos from './ListaArticulos';

const HomePage = ({ articulos, setRecargarArticulos }) => {
    return(
        <Fragment>
            <h1 className="text-center">Artículos de lectura</h1>
            <div className="row mx-1 mt-5">
                {
                    articulos.map( articulo => (
                        <ListaArticulos
                            key={ articulo.id }
                            articulo={ articulo }
                            setRecargarArticulos={ setRecargarArticulos }
                        />
                    ) )
                }
            </div>
        </Fragment>
    )
}

export default HomePage;
