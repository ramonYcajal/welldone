import React from 'react';
import { Link } from 'react-router-dom';

const ListaArticulosEdicion = ({ articulo }) => {

    const fechaFormateada = new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format( articulo.fecha_publicacion );

    const eliminarArticulo = id => {
        console.log( 'eliminado', id );
        // TODO: eliminar los registros
    }

    return(
        <li className="list-group-item d-flex justify-content-between align-items-center" data-categoria={ articulo.categoria }>
            <p>
                <span className="font-weight-bold">{ articulo.titulo }</span><br/><small>{ fechaFormateada }</small>
            </p>
            <div>
                <Link
                    to={`/articulos/editar/${ articulo.id }`}
                    className="btn btn-success mr-2"
                >Editar </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarArticulo( articulo.id )}
                >
                    Eliminar &times;
                </button>
            </div>
        </li>
    )
}

export default ListaArticulosEdicion;