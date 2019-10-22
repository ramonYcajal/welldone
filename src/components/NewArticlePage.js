import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import Error from './Error';
import ListaCategorias from './ListaCategorias';


const NewArticlePage = ({ history, setRecargarArticulos, usuario }) => {


    //state
    const [ titulo, setTitulo ] = useState('');
    const [ textoIntro, setTextoIntro ] = useState('');
    const [ imagen, setImagen ] = useState('');
    const [ contenido, setContenido ] = useState('');
    const [ tipoArticulo, setTipoArticulo ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ categorias, setCategorias ] = useState([]);

    const fechaPublicacion = Date.now();
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format( fechaPublicacion );
    
    const [ error, setError ] = useState( false );

    const getTypeArticle = e => {
        setTipoArticulo( e.target.value );
    }

    const getCategory = e => {
        setCategoria( e.target.value );
    }

    const AgregarArticulo = async e => {
        e.preventDefault();

        if( titulo === '' || textoIntro === '' || tipoArticulo === '' || categoria === '' || categoria === 'Seleccione Categoría...' || imagen === '' || contenido === ''){
            setError( true );
            return;
        }

        setError( false );

        // creamos el nuevo articulo
        try{
            const resultado = await axios.post( 'http://localhost:4000/articulos', {
            titulo,
            texto_introduccion: textoIntro,
            contenido,
            estado: tipoArticulo,
            fecha_publicacion: fechaPublicacion,
            categoria,
            usuario,
            imagen
            } );

            if( resultado.status === 201 ){
                Swal.fire(
                    'Artículo Creado',
                    'El artículo se creó correctamente',
                    'success'
                 );
            }

        } catch(error) {
            console.log( error );

            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo'
            })

        }

        // redirigimos al usuario a productos
        setRecargarArticulos( true );
        history.push( '/' );

    }

    useEffect(() => {
        // consultamos el API para obtener el listado de categorias
        const consultarCategoriasApi = async () => {
            const resultado = await axios.get( 'http://localhost:4000/categorias' );
 
            const categoriasFinal = [
                {
                    "categoria" : "Seleccione Categoría...",
                    "id" : 0
                },
                ...resultado.data
            ]

            setCategorias( categoriasFinal );
        }

        consultarCategoriasApi();


    }, [ ])

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Nuevo Artículo</h1>
            <span  className="text-center"><small>{ fechaFormateada }</small></span>
            {( error ) ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <form
                className="mt-5"
                onSubmit={ AgregarArticulo }
            >
                <div className="form-group">
                    <label>Título</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="titulo" 
                        placeholder="Establecer Título"
                        onChange={ e => setTitulo( e.target.value ) }
                    />
                </div>
                {
                    //TODO: ver si uncluimos obligatoriedad en la introducción de la imagen
                }
                <div className="form-group">
                    <label>Imagen</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="imagen" 
                        placeholder="Indicar URL de la imagen de cabecera"
                        onChange={ e => setImagen( e.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label>Introducción</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="introduccion" 
                        placeholder="Establecer texto introductorio"
                        onChange={ e => setTextoIntro( e.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea 
                        className="form-control" 
                        name="contenido" 
                        rows="10"
                        onChange={ e => setContenido( e.target.value ) }></textarea>
                </div>
                <div className="form-group">
                    <label>Categoría</label>
                    <select 
                        className="form-control form-control-lg"
                        onChange={ getCategory }
                    >
                        {
                            categorias.map(categoria => (
                                <ListaCategorias
                                    key={ categoria.id }
                                    categoria={ categoria.categoria }
                                />
                            ))
                        }
                    </select>
                
                </div>
                <legend className="text-center">Estado Artículo:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="estado"
                            value="borrador"
                            onChange={ getTypeArticle }
                        />
                        <label className="form-check-label">
                            Borrador
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="estado"
                            value="publicado"
                            onChange={ getTypeArticle }
                        />
                        <label className="form-check-label">
                            Publicado
                        </label>
                    </div>
                </div>
                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3 mb-3" value="Agregar Artículo" />
            </form>
        </div>
    )
}

export default withRouter( NewArticlePage );