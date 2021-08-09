import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm  } from '../../hooks/useForm';
import { setError, setRemoveError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );
    //console.log(msgError); 

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName( email, password, name ) );
        }
    };

    const isFormValid = () => {
        if( name.trim().length === 0 ){
            dispatch( setError('Name is required') );
            return false;
        }
        else if( !validator.isEmail( email ) ){
            dispatch( setError('The Email format is incorrect!') );
            return false;
        }
        else if( password !== password2 || password.length < 6 ){
            dispatch( setError('The password should be at least 6 characters and match each other.') );
            return false;
        }
        dispatch( setRemoveError() );
        return true;
    }

    return (
        <>
            <div className="google-icon-wrapper animate__animated animate__fadeIn animate__faster">
            <img style={{marginBottom: "7px"}} className="login-icon" width="247" src="https://transparencia.gob.es/transparencia/dam/jcr:dbf82134-2b13-4fdb-8d6f-a0661acbe4ca/logo_2030.2021-02-02-10-30-24.png" alt="google button" />
            </div>
            <h3 className="auth__title animate__animated animate__fadeInDown animate__faster">Please register</h3>
            <form className="form animate__animated animate__fadeIn animate__faster" onSubmit={ handleRegister } >
                {
                    msgError &&
                    <div className="alert alert-danger">
                        { msgError }
                    </div>
                }

                <input  
                    type="text" 
                    placeholder="Name" 
                    autoComplete="off" 
                    className="auth__input mt-4 form-control" 
                    name="name" 
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input  
                    type="text" 
                    placeholder="Email" 
                    autoComplete="off" 
                    className="auth__input form-control" 
                    name="email" 
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input  
                    type="password" 
                    placeholder="Password" 
                    className="auth__input mt-2 form-control" 
                    name="password" 
                    value={ password }
                    onChange={ handleInputChange }
                />
                <input  
                    type="password" 
                    placeholder="Confirm password" 
                    className="auth__input mt-2 form-control" 
                    name="password2" 
                    value={ password2 }
                    onChange={ handleInputChange }
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mt-3
                ">
                    Register
                </button>
                {/* <hr className="mt-5" />
                <div className="google-btn" >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Login with Google</b>
                    </p>
                </div> */}

                <div className="text-center mt-3 btn-block">
                    <Link className="link" to="auth/login">
                        Already registered?
                    </Link>
                </div>
            </form>
        </>
    )
}
