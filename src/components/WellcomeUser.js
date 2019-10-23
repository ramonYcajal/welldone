import React from 'react';

const WellcomeUser = ({ usuario }) => (
    <div className="float-right mr-3">
        <small className="text-white ml-3">Hola { usuario.username }!</small>
    </div>
)

export default WellcomeUser;