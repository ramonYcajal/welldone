import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

//axios.defaults.baseURL = 'api.elmoribundogarci.com';

const SignUp = () => {
    

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
            console.log(authentication)
            //const resultado = await axios.post( 'http://api.elmoribundogarci.com/api/auth/users/', authentication, headers );
            const resultado = await axios.post({
                                        url: 'http://api.elmoribundogarci.com/api/auth/users/', 
                                        data: authentication, 
                                        headers: headers
                                    });
            if( resultado.status === 201 ){
                Swal.fire(
                        'Usuario Creado',
                        'El usuario se creó correctamente',
                        'success'
                    );
                console.log( resultado )
            }
            
        } catch( error ) {
            console.log( error );

            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'No se ha podido dar el alta, vuelve a intentarlo'
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

export default SignUp;