import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { activeNote, deleteNote, startDeleting } from '../../actions/notes';

import { useForm } from '../../hooks/useForm';
import NoteAppBar from './NoteAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset] = useForm( note );
    const { body, title, id, url } = formValues;
    console.log('URL', url);
    const dispatch = useDispatch();

    const activeId = useRef( note.id );

    useEffect(() => {
        if( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues } ) );
    }, [ formValues, dispatch ])

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    };

    return (
        <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
            <NoteAppBar />

            <div className="notes__content">
                <input 
                    type         = "text"
                    placeholder  = "Some awesome title"
                    className    = "notes__title-input" 
                    autoComplete = "off" 
                    name         = "title"
                    value        = { title }
                    onChange     = { handleInputChange }
                    />
                <textarea 
                    placeholder  = "What happened today?"
                    name         = "body"
                    className    = "notes__title-textarea" 
                    value        = { body }
                    onChange     = { handleInputChange }
                />
                
            </div>
            
            <div className="notes__image">
                <img 
                    src  = { note.url }
                    name = "url"
                    alt  = "imagen"
                />
            </div>

            <button
                className = "btn btn-danger"
                onClick   = { handleDelete }
            >
                <i className="fas fa-trash-alt"></i> Delete
            </button>
        </div>
    )
}
