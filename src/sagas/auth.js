import { types } from "../types/types";
import firebase  from "firebase";
import Swal      from "sweetalert2";
import { put, takeLatest, take } from "redux-saga/effects";
import { googleAuthProvider    } from "../firebase/fireBase-config";

function* startLoginEmailPasswords ({ payload }) {
    try {   
            console.log('startLoginEmailPasswords');
            const { email, password } = payload;
            let varUid = null;
            let varDisplayName = null;
            yield put({ type: types.uiStartLoading });
            yield firebase.auth().signInWithEmailAndPassword( email, password )
                .then( ({ user }) => {
                    const { uid, displayName } = user;
                    varUid = uid;
                    varDisplayName = displayName;
                })
                .catch( ( e ) => {
                    console.error(e);
                    Swal.fire('Error',e.message,'error');
                });
            console.log(">>",varUid, varDisplayName);
            yield put({ type: types.login, payload: { uid: varUid, displayName: varDisplayName }});
            yield put({ type: types.uiFinishLoading });
    } 
    catch (err) {
        console.log('error: '+err);
    }  
}

function* registerWithEmailPasswordName ({ payload }) {
    try{
        const { email, password, name } = payload;
        let varUid = null;
        let varDisplayName = null;
        yield firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                user.updateProfile({ displayName: name });
                const { uid, displayName } = user;
                varUid = uid;
                varDisplayName = displayName;
            })
            .catch( e => {
                console.log(e);
            });
        
        yield put({ type: types.login, payload: { uid: varUid, displayName: varDisplayName }});
    } 
    catch (err) {
        console.log('error: '+err);
    }  
}

function* startLogout () {
    try{
        yield firebase.auth().signOut();
        yield put({ type: types.notesLogoutCleaning });
    } 
    catch (err) {
        console.log('error: '+err);
    }  
};

function* loginGoogle () {
    try{
        console.log('googleLogin');
        let varUid = null;
        let varDisplayName = null;
        yield firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                const { uid, displayName } = user;
                varUid = uid;
                varDisplayName = displayName;
            });
        yield put({ type: types.login, payload: { uid: varUid, displayName: varDisplayName }});
    } 
    catch (err) {
        console.log('error: '+err);
    }  
};

export default function* sagasAuth() {
    yield takeLatest( types.loginEmailPasswords, startLoginEmailPasswords);
    yield takeLatest( types.logout, startLogout );
    yield takeLatest( types.loginGoogle, loginGoogle );
    yield takeLatest( types.registerWithEmailPasswordName, registerWithEmailPasswordName );
};