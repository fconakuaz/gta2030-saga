import { db } from "../firebase/fireBase-config";

export const loadNotes = async ( uid ) => {

    const snapshot = await db.collection(`${ uid }/journal/notes`).get();
    const notes    = [];
    
    snapshot.forEach( note => {
        notes.push({
            id: note.id,
            ...note.data()
        });
    });
    return notes;
};