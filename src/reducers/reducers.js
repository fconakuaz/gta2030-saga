import { combineReducers } from "redux";

import { authReducer  } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer    } from '../reducers/uiReducer';

export const reducers = combineReducers({
    auth  : authReducer,
    ui    : uiReducer,
    notes : notesReducer
});     