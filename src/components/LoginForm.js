import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setIsAuthenticated, setMyToken }) => {

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

        console.log( authentication )

        try{
            const resultado = await axios({
                method: 'post',
                url: 'http://api.elmoribundogarci.com/api/auth/token/login/', 
                data: authentication, 
                headers: headers
            });

            setIsAuthenticated( true );

            console.log( resultado.data.auth_token )

            setMyToken( resultado.data.auth_token );

        } catch( error ) {
            console.log( error );
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

export default LoginForm;