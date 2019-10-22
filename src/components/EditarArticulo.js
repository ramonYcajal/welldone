import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import Error from './Error';
import ListaCategorias from './ListaCategorias';


const EditarArticulo = props => {

    const { history, articulo, setRecargarArticulos } = props;

    // refs
    const tituloRef = useRef('');
    const textoIntroRef = useRef('');
    const contenidoRef = useRef('');
    const imagenRef = useRef('');

    // state
    const [ error, setError ] = useState( false );
    const [ tipoArticulo, setTipoArticulo ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ categorias, setCategorias ] = useState([]);


    const getTypeArticle = e => {
        setTipoArticulo( e.target.value );
    }

    const getCategory = e => {
        setCategoria( e.target.value );
    }

    const editarArticulo = async e => {
        e.preventDefault();

        // comprobamos si la categoría y/o el estado del artículo han cambiado, de lo contrario asignamos el mismo valor
        let catArticulo = ( categoria === '' ) ? articulo.categoria : categoria;
        let estadoArticulo = ( tipoArticulo === '' ) ? articulo.tipoArticulo : tipoArticulo;

        // realizamos las validaciones
        if( tituloRef.current.value === '' || textoIntroRef.current.value === '' || contenidoRef.current.value === '' || estadoArticulo === '' || catArticulo === '' || imagenRef.current.value === ''){
            setError( true );
            return;
        }

        setError( false );

        // obtenemos el resto de valores del formulario

        const datosArticulo = {
            titulo : tituloRef.current.value,
            texto_introduccion : textoIntroRef.current.value,
            contenido : contenidoRef.current.value,
            estado : estadoArticulo,
            categoria : catArticulo,
            imagen : imagenRef.current.value
        }
        
        // enviamos el request
        const url = `http://localhost:4000/articulos/${ articulo.id }`;

        try{
            const resultado = await axios.put( url, datosArticulo );
            
            if( resultado.status === 200 ){
                Swal.fire(
                    'Artículo Editado',
                    'El artículo se editó correctamente',
                    'success'
                 );
                
                // redirigimos al usuario a productos
                setRecargarArticulos( true );
                history.push( '/usuario/articulos' );

            }

        } catch( error ){
            console.log( error );

            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo'
            })
        }

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
            <h1>Editar Artículo</h1>

            { ( error ) ? <Error mensaje='Todos los campos son obligatorios' /> : null }  
            <form
                className="mt-5"
                onSubmit={ editarArticulo }
            >
                <div className="form-group">
                    <label>Título</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="titulo" 
                        placeholder="Establecer Título"
                        ref={ tituloRef }
                        defaultValue={ articulo.titulo }
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
                        ref={ imagenRef }
                        defaultValue={ articulo.imagen }
                    />
                </div>
                <div className="form-group">
                    <label>Introducción</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="introduccion" 
                        placeholder="Establecer texto introductorio"
                        ref={ textoIntroRef }
                        defaultValue={ articulo.texto_introduccion }
                    />
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea 
                        className="form-control" 
                        name="contenido" 
                        rows="10"
                        ref={ contenidoRef }
                        defaultValue={ articulo.contenido }
                    />
                </div>
                <div className="form-group">
                    <label>Categoría</label>
                    <select 
                        className="form-control form-control-lg"
                        onChange={ getCategory }
                    >
                        {
                            categorias.map(categoria => {
                                return (
                                    <ListaCategorias
                                        key={ categoria.id }
                                        categoria={ categoria.categoria }
                                    />
                                );
                            })
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
                            defaultChecked={ ( articulo.estado === 'borrador' ) }
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
                            defaultChecked={ ( articulo.estado === 'publicado' ) }
                        />
                        <label className="form-check-label">
                            Publicado
                        </label>
                    </div>
                </div>
                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3 mb-3" value="Editar Artículo" />
            </form>
        </div>
        

    )
}

export default withRouter( EditarArticulo );