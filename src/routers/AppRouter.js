import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { useDispatch       } from 'react-redux'
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { login             } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'
import { JournalScreen     } from '../components/journal/JournalScreen'
import { AuthRouter        } from './AuthRouter'
import { PrivateRoute      } from './PrivateRoute'
import { PublicRoute       } from './PublicRoute'

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking]     = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async ( user ) => {
            if ( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setisLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );
            }
            else{
                setisLoggedIn( false );
            }
            setChecking(false);
        });
    }, [ dispatch, setChecking, setisLoggedIn ])

    if( checking ){
        return (
            <img className="app-router__img" src="https://landing.sanitasweb.es/globalcare/welcomecenter/wp-content/uploads/2016/04/preloader.gif.pagespeed.ce_.kTTfnPFCn7.gif" />
        );
    }
    
    return (
        <Router>
            <div>
            <Switch>
                <PublicRoute 
                    path="/auth"   
                    component={ AuthRouter }    
                    isAuthenticated={ isLoggedIn } 
                />
                <PrivateRoute 
                    isAuthenticated={ isLoggedIn } 
                    exact 
                    path="/" component={ JournalScreen } 
                />
                <Redirect to={`/auth/login`} />
            </Switch>
            </div>
        </Router>
    )
}
