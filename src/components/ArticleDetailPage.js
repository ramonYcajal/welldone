import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleDetailPage = props => {

    const [articulo, setArticulo] = useState({});

    // tomar el ID del artículo
    const idArticulo = parseInt(props.match.params.id);

    useEffect(() => {

        const consultarApi = async () => {
            // realizamos la consulta al API
            const resultado = await axios.get(`https://api.elmoribundogarci.com/articulos/${idArticulo}`);

            setArticulo(resultado.data);

        }

        consultarApi();


    }, [idArticulo]);

    const fecha = new Date(articulo.fecha_creacion);
    let day = fecha.getDate();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();
    const dateFormatted = day + '-' + month + '-' + year;

    return (

        <div className="row pb-3 wrapper-info">
            <div className="col-lg-4 col-sm-4 px-0">
                <figure className="m-0">
                    <img className="img-fluid w-100 imgArticle" src={`${articulo.imagen}`} alt={articulo.titulo} />
                </figure>
            </div>
            <div className="col-lg-8 col-sm-8">
                <div className="mh-100">
                    <div className="mh-100 p-3 text-center text-white bg-dark h4  align-items-center justify-content-center drv-title shadow">
                        <span className="d-block w-100">{articulo.titulo}</span>
                        <small className="d-block w-100 tagline-text">{articulo.nombre}</small>
                    </div>
                    <div className="m-0 p-3 text-right">
                        <small>{dateFormatted}</small>
                    </div>
                    <div className="m-0 p-3 text-justify">
                        <h4>Contenido</h4>
                        <p>{articulo.contenido}</p>
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