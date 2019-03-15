import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const auth = props => {
    /**
     * `useContext` gets the context provided in a upper compoment
     */
    const auth = useContext(AuthContext);

    return (
        <button onClick={auth.login}>Log In</button> 
    )
};

export default auth;