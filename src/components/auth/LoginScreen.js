import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { login, loginEmailPasswords, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange] = useForm ({
        email: '',
        password: ''
    });

    const { loading } = useSelector (state => state.ui);

    const { email, password } = formValues;

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const handleLogin = (e) => {
        e.preventDefault(); 
        dispatch( loginEmailPasswords( email, password ) );
        //dispatch( startLoginEmailPassword ( email, password ) );
    };
    
    return (
        <>
            <div className="google-icon-wrapper animate__animated animate__fadeIn animate__faster">
                <img style={{marginBottom: "7px"}} className="login-icon" width="247" src="https://transparencia.gob.es/transparencia/dam/jcr:dbf82134-2b13-4fdb-8d6f-a0661acbe4ca/logo_2030.2021-02-02-10-30-24.png" alt="google button" />
            </div>
            <h3 className="auth__title animate__animated animate__fadeIn animate__faster">Please sign in</h3>
            <form className="animate__animated animate__fadeIn animate__faster" onSubmit={ handleLogin }>
                <input  
                    type="text" 
                    placeholder="Email" 
                    autoComplete="off" 
                    className="auth__input mt-4 form-control" 
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
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mt-3"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="login-or">
                    <hr className="hr-or" /> 
                    <span className="span-or">or</span>
                </div>

                <div 
                    className="google-btn" 
                    onClick = { handleGoogleLogin }
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Login with Google</b>
                    </p>
                </div>

                <div className="text-center mt-3 btn-block">
                    <Link className="link" to="/auth/register">
                        Create a new account
                    </Link>
                </div>
            </form>
        </>
    )
}
