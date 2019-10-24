import React from 'react';
import { Link } from 'react-router-dom';

const ListaArticulos = ({ articulo, setRecargarArticulo }) => {

    const { id,
            titulo,
            fecha_creacion,
            imagen,
            // usuario,
            nombre,
            texto_introduccion
        } = articulo;

    // const fechaFormateada = new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format( fecha_creacion );
    const fecha = new Date(fecha_creacion);
    let day = fecha.getDate();
    let month = fecha.getMonth();
    let year = fecha.getFullYear();
    const dateFormatted = day + '-' + month + '-' + year;
    return(
        <div className="col-12 col-md-6 col-lg-3 mb-3" key={ id }>
            <div className="card shadow align-items-strech justify-content-between">
                <Link to={`/articulos/${ id }`}>
                    <div className="card-header mh-100 text-center  text-white bg-dark h6 d-flex align-items-center justify-content-center drv-title">
                        <span>{ titulo }</span>
                    </div>
                </Link>
                <div className="card-body m-0 p-1">
                    <figure className="m-0">
                        <img className="img-fluid w-100 " src={`${ imagen }`} alt={ articulo.titulo } />
                    </figure>
                </div>
                <div className="row p-3 mt-0">
                    <div className="col-12 pl-3 text-left">
                        <small>{ dateFormatted } </small>
                    </div>
                </div>
                <div className="row p-3 mt-0">
                    <div className="col-12 pl-3 text-left">
                        <p>{ texto_introduccion }</p>
                    </div>
                </div>
                <div className="row p-3 mt-0">
                    <div className="col-12 text-right">
                        <pre>{ nombre }</pre>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ListaArticulos;