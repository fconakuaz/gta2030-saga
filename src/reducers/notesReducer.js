import { types } from "../types/types"

const initialState = {
    notes  : [],
    active : null
}

export const notesReducer = ( state = initialState, { type, payload }) => {
    switch (type) {
        case types.notesActive:
            return  {
                        ...state,
                        active: { ...payload }
                    }

        case types.notesLoad:
            return  {
                        ...state,
                        notes: [ ...payload ]
                    }
                    
        case types.notesUpdate:
            return  {
                        ...state,
                        notes: state.notes.map(
                            note => note.id === payload.id
                                ? payload.note
                                : note
                        )
                    }

        case types.notesDelete:
            return  {
                        ...state,
                        active : null,
                        notes  : state.notes.filter( note => note.id !== payload )
                    } 

        case types.notesLogoutCleaning:
            return  {
                        ...state,
                        active : null,
                        notes  : []
                    }       
    
        case types.notesAdded:
            return  {
                        ...state,
                        notes  : [ payload, ...state.notes ]
                    }       
        
        default:
            return state
    }
}

