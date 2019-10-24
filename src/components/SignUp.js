import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const SignUp = ({ history }) => {
    

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const realizarAlta = async e => {
        e.preventDefault();
        
        const headers = {
            'Content-Type': 'application/json'
          };

        const authentication = {
            username,
            password,
            email
        };

        try{
            const resultado = await axios({
                method: 'post',
                url: 'https://api.elmoribundogarci.com/api/auth/users/', 
                data: authentication, 
                headers: headers,
                transformResponse: [function (data) {
                    return data;
                  }],
                responseType: 'json'
            });
            if( resultado.status === 201 ){

                Swal.fire(
                        'Usuario Creado',
                        'El usuario se creó correctamente',
                        'success'
                    );
                // redirigimos al usuario a artículos
                history.push( '/' );
            }
            
        } catch( error ) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                var output = '';
                var readErrors = Object.keys(error.response.data);
                readErrors.forEach(function(givenError) {
                var items = Object.keys(error.response.data[givenError]);
                items.forEach(function(item) {
                        var value = error.response.data[givenError][item];
                        output += '<p>' + givenError+' : ' + value + '</p>';
                    });
                });

              } 
           
            Swal.fire({
                type: 'error',
                title: 'Error',
                html: output
            });
        }

        
    }

    return(
        <Fragment>
            <h1 className="mb-5 text-center">Alta de Usuario</h1>
            <form   
                onSubmit={ realizarAlta }
            >
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        aria-describedby="usernameHelp" 
                        placeholder="Indique un nombre de usuario"
                        onChange={ e => setUsername( e.target.value ) }
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Dirección de Correo</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Indique su Email" 
                        onChange={ e => setEmail( e.target.value ) }
                        required />
                    <small id="emailHelp" className="form-text text-muted">Nunca compartiremos su correo electrónico con nadie más.</small>
                </div>
                <div className="form-label-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        placeholder="Password" 
                        onChange={ e => setPassword( e.target.value ) }
                        required />
                </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase mt-5" type="submit">Darse de Alta</button>
            </form>
        </Fragment>
        
        
    )
}

export default withRouter( SignUp );
