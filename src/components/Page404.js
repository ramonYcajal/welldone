import React from 'react';
import { withRouter } from 'react-router-dom';

const Page404 = ({ history }) => {
    console.log( history )

    const goBack404 = e => {
        e.preventDefault();
        history.goBack();
    }

    return(
        <div className="text-center">
            <h1>404: Página no encontrada</h1>
            <form 
                onSubmit={ goBack404 }
            >
                <button 
                    type="submit" 
                    className="btn btn-primary mb-2 mt-5">
                        Sácame de Aquí!
                </button>
            </form>
        </div>
    )
}

export default withRouter( Page404 );