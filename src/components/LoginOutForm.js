import React from 'react';
import axios from 'axios';

const LoginForm = ({ setIsAuthenticated, myToken }) => {

    console.log(myToken)

    const realizarLogOut = async e => {
        e.preventDefault();
        const token = `Token ${ myToken }`;

        console.log( token )

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          };

        console.log( headers )

        try{
            const resultado = await axios({
                method: 'post',
                url: 'http://api.elmoribundogarci.com/api/auth/token/logout/', 
                headers: headers
            });
            console.log( resultado )

            setIsAuthenticated( false );

            

        } catch( error ) {
            console.log( error );
        }
        
    }

    return(
        <form 
            className="form-inline"
            onSubmit={ realizarLogOut }
        >
            <button type="submit" className="btn btn-primary mb-2">Logout</button>
        </form>
    )
}

export default LoginForm;