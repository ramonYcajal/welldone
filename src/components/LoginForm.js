import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated, setMyToken, setUsuario, history }) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const realizarLogin = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
          };

        const authentication = {
            username,
            password
        }

        try{
            const resultado = await axios({
                method: 'post',
                url: 'https://api.elmoribundogarci.com/api/auth/token/login/', 
                data: authentication, 
                headers: headers,
                transformResponse: [function (data) {
                    return data;
                  }],
                responseType: 'json'
            });

            if( resultado.status === 200 ){
                
                const token = `Token ${ resultado.data.auth_token }`;
    
                const userHeaders = {
                    'Content-Type': 'application/json',
                    'Authorization': token
                    };
    
                const userData = await axios({
                    method: 'get',
                    url: 'https://api.elmoribundogarci.com/api/auth/users/me/', 
                    headers: userHeaders
                });

                if( userData.status === 200 ){
                    setIsAuthenticated( true );

                    Swal.fire(
                            'Login Correcto',
                            `Bienvenido ${ userData.data.username }!`,
                            'success'
                        );
                    setMyToken( resultado.data.auth_token );
                    
                    setUsuario({
                        username: userData.data.username,
                        id: userData.data.id,
                        token: resultado.data.auth_token
                    });

                    // redirigimos al usuario a la home
                    history.push( '/' );
                }
            }

        } catch( error ) {
            console.log( error );
            var output = '';
                var readErrors = Object.keys(error.response.data);
                readErrors.forEach(function(givenError) {
                var items = Object.keys(error.response.data[givenError]);
                items.forEach(function(item) {
                        var value = error.response.data[givenError][item];
                        var returnError =  givenError + ' : ';
                        if(givenError === 'non_field_errors')returnError='';
                        output += '<p>' + returnError + value + '</p>';
                    });
                });
            Swal.fire({
                type: 'error',
                title: 'Error',
                html: output
            });
            setIsAuthenticated( false );
        }
        
    }

    return(
        <form 
            className="form-inline"
            onSubmit={ realizarLogin }
        >
            <div className="form-group mb-2">
                <input 
                    type="text" 
                    className="form-control" 
                    id="userlogin" 
                    placeholder="Usuario" 
                    required
                    onChange={ e => setUsername( e.target.value ) }
                />
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <input 
                    type="password" 
                    className="form-control" 
                    id="passlogin" 
                    placeholder="Password"
                    required
                    onChange={ e => setPassword( e.target.value ) }
                />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Sign in</button>
        </form>
    )
}

export default withRouter( LoginForm );