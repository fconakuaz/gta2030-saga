import { types } from "../types/types";

export const startRegisterWithEmailPasswordName = ( email, password, name ) => ({
    type    : types.registerWithEmailPasswordName,
    payload : { email, password, name }
});

export const startGoogleLogin = () => ({
    type    : types.loginGoogle
});

export const login = ( uid, displayName ) => ({
    type    : types.login,
    payload : { uid, displayName }
});

export const logout = () => ({
    type    : types.logout
});

export const loginEmailPasswords = ( email, password ) => ({
    type    : types.loginEmailPasswords,
    payload : { email, password }
});