import { types } from "../types/types";
/* 
    {
        uid: 'asdasduyaysduyut6565656',
        name: 'Francisco'
    }
*/

export const authReducer = ( state = {}, action ) => {
    switch (action.type) {
        case types.login:
            console.log("change login", action);
            return { 
                uid  : action.payload.uid, 
                name : action.payload.displayName
            };
            
        case types.logout:
            return { };
    
        default:
            return state;
    }
}