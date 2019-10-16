import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Header from './components/Header';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUp';
import ArticleDetailPage from './components/ArticleDetailPage';
import UserDetailPage from './components/UserDetailPage';
import UserUpdate from './components/UserUpdate';
import CategoriesPage from './components/CategoriesPage';


function Welldone() {
  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route exact path="/alta-usuarios" 
                render={ () => (
                  <SignUpPage />
                ) } 
          />
          <Route exact path="/categorias" component={ CategoriesPage } />
          <Route exact path="/articulos/:id" component={ ArticleDetailPage } />
          <Route exact path="/usuarios/:id" component={ UserDetailPage } />
          <Route exact path="/usuarios/editar/:id" component={ UserUpdate } />
          <Route exact path="/" component={ HomePage } />
        </Switch>
      </main>
    </Router>
  );
}

export default Welldone;
