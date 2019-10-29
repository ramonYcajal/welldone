import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated, myToken, setUsuario,  history }) => {

    const realizarLogOut = async e => {
        e.preventDefault();
        const token = `Token ${ myToken || JSON.parse( sessionStorage.getItem( 'WellDone' ) ).usrToken }`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
          };

        try{
            const resultado = await axios({
                method: 'post',
                url: 'https://api.elmoribundogarci.com/api/auth/token/logout/', 
                headers: headers
            });

            if( resultado.status === 204 ){
                setIsAuthenticated( false );
                Swal.fire(
                        'Usuario Deslogado',
                        'El usuario se deslogó correctamente',
                        'success'
                    );
                // limpiamos state y sesiones guardadas
                setUsuario({});
                sessionStorage.removeItem('WellDone');

                // redirigimos al usuario a artículos
                history.push( '/' );
            }

            

        } catch( error ) {
            console.log( error );
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'No se ha podido deslogar, vuelve a intentarlo'
            });
        }
        
    }

    return(
        <form 
            onSubmit={ realizarLogOut }
        >
            <button type="submit" className="btn btn-primary mb-2">Logout</button>
        </form>
    )
}

export default withRouter( LoginForm );