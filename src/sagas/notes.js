import { put, call, takeLatest, take, select } from "redux-saga/effects";
import Swal from "sweetalert2";
import { db } from "../firebase/fireBase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { getAuth } from "./selectors";

function* notesLoading ({ payload }) {
    try {    
        const notes = yield loadNotes( payload.uid );
        console.log(notes); 
        yield put ({
            type    : types.notesLoad,
            payload : notes
        });
    }
    catch (err) {
        console.log('error: '+err);
    }
};

function* notesSave ({ payload }) {
    try {
        const note = { ...payload };
        console.log("notesSave");
        console.log(note);

        const { uid } = yield select(state => state.auth);
        console.log("uid: ", uid);


        if ( !note.url ) 
           delete note.url;

        const noteToFireStore = { ...note };
        // delete noteToFireStore.id;
        
        try {
            const updateNote = yield db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFireStore );
            yield put({
                type    : types.notesUpdate,
                payload : {
                            id: uid,
                            note: {
                                id: note.id,
                                ...note
                            }            
                          }
            }); 
            Swal.fire('Saved',note.title,'success');
        } 
        catch (error) {
            Swal.fire('Error', error, 'error');
        }
    
    }
    catch (err) {
        console.log('error: '+err);
    }
};

export const apiFirebaseAdd = async( uid, newNote ) => {
    return await db.collection(`${ uid }/journal/notes`).add( newNote );
};


function* notesNew () {
    try{
        const state   = yield select(state => state.auth);
        const { uid } = state;
        const newNote = {
                            title : '',
                            body  : '',
                            date  : new Date().getTime(),
                            url   : 'https://images.vectorhq.com/images/istock/previews/9720/97203331-calendar-icon-vector-illustration-calendar-icon-calendar-ic.jpg',
                        };
        const note    = yield call(apiFirebaseAdd, uid, newNote);
        
        console.log('Back',note);
        
        yield put({
            type    : types.notesActive,
            payload : { id: uid, newNote }
        });
        yield put({
            type    : types.notesAdded,
            payload : { id: uid, newNote }
        });
    } 
    catch (err) {
        console.log('error: '+err);
    }  
};

export default function* notesAuth() {
   yield takeLatest( types.notesNew,     notesNew );
   yield takeLatest( types.notesLoading, notesLoading );
   yield takeLatest( types.notesSave,    notesSave );
};