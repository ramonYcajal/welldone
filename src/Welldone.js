import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// components
import Header from './components/Header';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUp';
import ArticleDetailPage from './components/ArticleDetailPage';
import UserDetailPage from './components/UserDetailPage';
import UserUpdate from './components/UserUpdate';
import CategoriesPage from './components/CategoriesPage';
import NewArticlePage from './components/NewArticlePage';
import EditarArticulo from './components/EditarArticulo';
import Articulos from './components/Articulos';

function Welldone() {

  //state
  const [ usuario, setUsuario ] = useState({});
  const [ articulos, setArticulos ] = useState([]);
  const [ recargarArticulos, setRecargarArticulos ] = useState( true );
  const [ isAuthenticated, setIsAuthenticated ] = useState( false );

  useEffect(() => {
    if( recargarArticulos ){
      const consultarApi = async () => {
        // realizamos la consulta al API
        const resultadoArticulos = await axios({ 
                                            method: 'get',
                                            url: 'http://api.elmoribundogarci.com/articulos/' 
                                          });

        setArticulos( resultadoArticulos.data.results );
      }

      consultarApi();

      // cambiamos a false la recarga de articulos para que no este recargando continuamente
      setRecargarArticulos( false );
    }
  }, [ recargarArticulos ]);

  return (
    <Router>
      <Header 
        isAuthenticated={ isAuthenticated }
        setIsAuthenticated={ setIsAuthenticated }
        usuario={ usuario }
        setUsuario={ setUsuario }
      />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/usuario/nuevo" 
                render={ () => (
                  <SignUpPage />
                ) } 
          />
          <Route exact path="/usuario/articulos" 
                render={ () => (
                  <Articulos
                    usuario={ usuario }
                  />
                ) } 
          />
          <Route exact path="/categorias" component={ CategoriesPage } />
          <Route exact path="/articulos/nuevo" 
                 render={() => (
                   <NewArticlePage
                    usuario={ usuario }
                    setRecargarArticulos={ setRecargarArticulos }
                   />
                 )

                 } 
          />
          <Route exact path="/articulos/:id" component={ ArticleDetailPage } />
          <Route exact path="/articulos/editar/:id"
            render={ props => {
              // obtenemos el id del artículo
              const id = parseInt( props.match.params.id );
              
              const articulo = articulos.filter( articulo => articulo.id === id );

              return(
                <EditarArticulo
                  articulo={ articulo[ 0 ] }
                  setRecargarArticulos={ setRecargarArticulos }
                />
              );
            }
            }
          />
          <Route exact path="/usuarios/:id" component={ UserDetailPage } />
          <Route exact path="/usuarios/editar/:id" component={ UserUpdate } />
          <Route exact path="/"
                 render={ () =>  (
                   <HomePage
                    articulos={ articulos }
                    setRecargarArticulos={ setRecargarArticulos }
                   />
                 ) }  />
        </Switch>
      </main>
    </Router>
  );
}

export default Welldone;
