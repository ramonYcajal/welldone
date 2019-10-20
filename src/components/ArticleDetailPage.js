import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleDetailPage = props => {

    const [ articulo, setArticulo ] = useState({});

    // tomar el ID del artículo
    const idArticulo = parseInt( props.match.params.id );

    useEffect(() => {

        const consultarApi = async () => {
            // realizamos la consulta al API
            const resultado = await axios.get( `http://localhost:4000/articulo/${ idArticulo }` );

            console.log(resultado.data)
            setArticulo( resultado.data );
        }
    
          consultarApi();
    
       
      }, [ idArticulo ]);

    return(
        <h1 className="text-center">{ articulo.titulo }</h1>
    )
}

export default ArticleDetailPage;