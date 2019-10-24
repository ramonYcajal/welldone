import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleDetailPage = props => {

    const [ articulo, setArticulo ] = useState({});

    // tomar el ID del artículo
    const idArticulo = parseInt( props.match.params.id );

    useEffect(() => {

        const consultarApi = async () => {
            // realizamos la consulta al API
            const resultado = await axios.get( `https://api.elmoribundogarci.com/articulos/${ idArticulo }` );
            console.log(resultado)
            setArticulo( resultado.data );
        }
    
          consultarApi();
    
       
      }, [ idArticulo ]);

      //console.log(articulo.comentarios)

    return(
        <div className="row mx-0 pb-3 px-0 wrapper-info">
            <div className="col-12 col-sm-4 px-0">
                <figure className="m-0">
                    <img className="img-fluid w-100" src={`${ articulo.imagen }`} alt={ articulo.titulo } />
                </figure>
            </div>
            <div className="col-12 col-sm-8 px-0">
                <div className="mh-100">
                    <div className="mh-100 mt-1 p-3 text-center text-white bg-dark h4  align-items-center justify-content-center drv-title shadow">
                        <span className="d-block w-100">{ articulo.titulo }</span>
                        <small className="d-block w-100 tagline-text">{ articulo.nombre }</small>
                    </div>
                    {/* <div className="text-right mr-2">
                        {
                            props.details.genres.map(genre=>
                                <span className="badge badge-secondary mr-1" key={genre.id}>{genre.name}</span>
                            )
                        }
                    </div> */}
                    <div className="m-0 p-3 text-right">
                        <small>{ articulo.fecha_creacion }</small>
                    </div>
                    <div className="m-0 p-3 text-justify">
                        <h4>Contenido</h4>
                        <p>{ articulo.contenido }</p>
                    </div>
                    {/* <div className="mt-3 p-3">
                        <h4>Comentarios</h4>
                        <ul className="list-unstyled row px-3 mt-3">
                            {
                                // articulo.comentarios.map(comentario=>
                                //         <li className="list-item col-12 border-top py-2" key={ comentario.id_comentario}>{ comentario.comentario }</li>
                                // )
                            }
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ArticleDetailPage;