import React from 'react'
import { useSelector } from 'react-redux';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {

    const { notes } = useSelector( state => state.notes );
    console.log('JournalEntries');
    console.log(notes);
    notes.filter(el => el !== undefined);

    return (
        <div className="journal__entries animate__animated animate__fadeIn animate__faster">
            {
                notes.map( note => (
                    <JournalEntry 
                        key={note.id} 
                        { ...note }
                    />
                ))
            }
        </div>
    )
}

export default JournalEntries
