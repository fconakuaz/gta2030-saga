import Swal from "sweetalert2";

import { db         } from "../firebase/fireBase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes  } from "../helpers/loadNotes";
import { types      } from "../types/types";

// react-journal

export const startNewNote = () => ({
    type: types.notesNew
});

export const activeNote = ( id, note ) => ({
    type    : types.notesActive,
    payload : {
                id: id,
                ...note
              }
});

export const addNewNote = ( id, note ) => ({
    type : types.notesAdded,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => ({
    type    : types.notesLoading,
    payload : { uid: uid }
});

export const setNotes = ( notes ) => ({
    type    : types.notesLoad,
    payload : notes
});

export const startSaveNote = ( note ) => ({
    type    : types.notesSave,
    payload : note
});

export const refreshNote = (id, note) => ({
    type    : types.notesUpdate,
    payload : {
                id,
                note: {
                    id,
                    ...note
                }            
              }
});

export const startUploadFile = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title : 'Uploading...',
            text  : 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
        });

        const fileUrl  = await fileUpload( file );
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) );
        Swal.close();
    }
};

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});