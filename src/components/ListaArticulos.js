import React from 'react';
import { NavLink } from 'react-router-dom';

const ListaArticulos = ({ articulo, setRecargarArticulo }) => {

    const { id,
            titulo,
            fecha_publicacion,
            imagen,
            usuario,
            texto_introduccion
        } = articulo;

    return(
        <div className="col-12 col-md-6 col-lg-3 mb-3" key={ id }>
            <div className="card shadow align-items-strech justify-content-between">
                <NavLink to={`/articulos/${ id }`}>
                    <div className="card-header mh-100 text-center  text-white bg-dark h6 d-flex align-items-center justify-content-center drv-title">
                        <span>{ titulo }</span>
                    </div>
                </NavLink>
                <div className="card-body m-0 p-1">
                    <figure className="m-0">
                        <img className="img-fluid w-100 " src={`${ imagen }`} alt={ articulo.titulo } />
                    </figure>
                </div>
                <div className="row p-3 mt-0">
                    <div className="col-12 pl-3 text-left">
                        <small>{ fecha_publicacion }</small>
                    </div>
                </div>
                <div className="row p-3 mt-0">
                    <div className="col-12 pl-3 text-left">
                        <p>{ texto_introduccion }</p>
                    </div>
                </div>
                <div className="row p-3 mt-0">
                    <div className="col-12 text-right">
                        <pre>{ usuario }</pre>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ListaArticulos;