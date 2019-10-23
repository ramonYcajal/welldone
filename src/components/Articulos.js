import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import ListaArticulosEdicion from './ListaArticulosEdicion';
import Error from './Error';

const Productos = ({ usuario }) => {

    //state
    const [ articulos, setArticulos ] = useState([]);
    const [ recargarArticulos, setRecargarArticulos ] = useState( true );

    useEffect(() => {
        if( recargarArticulos ){
        const consultarApi = async () => {
            // realizamos la consulta al API
            const resultadoArticulos = await axios({ 
                                                method: 'get',
                                                url: `http://api.elmoribundogarci.com/articulos/?usuario=${ usuario.id }` 
                                            });

            setArticulos( resultadoArticulos.data.results );
        }

        consultarApi();

        // cambiamos a false la recarga de articulos para que no este recargando continuamente
        setRecargarArticulos( false );
        }
    }, [ recargarArticulos, usuario.id ]);

    return(
        <Fragment>
            <h1 className="text-center">Listado de Artículos</h1>
            { (articulos.length === 0 ) &&
                    <Error 
                        mensaje='No tiene aún ningún artículo creado'
                    />
                
            }
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