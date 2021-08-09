import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { startSaveNote, startUploadFile } from '../../actions/notes';

const NoteAppBar = () => {

    const dispatch   = useDispatch();
    const { active } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSaveNote( active )  );
    };

    const handleUploadFile = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if ( file ){
            dispatch( startUploadFile( file ) );
        }
    }

    return (
        <div className="notes__appbar animate__animated animate__fadeInDown animate__faster">
            <span>28 de Agosto 1900</span>
            <div>
                <input 
                    id        = "fileSelector"
                    type      = "file"
                    name      = "file"
                    style     = {{ display: "none" }} 
                    onChange  = { handleFileChange }
                />
                <button 
                    className = "btn white"
                    onClick   = { handleUploadFile }
                >
                    <i className="fas fa-images"></i> Picture
                </button>
                <button 
                    className = "btn white"
                    onClick   = { handleSave }
                >
                    <i className="fas fa-save"></i> Save
                </button>
            </div>
        </div>
    )
}

export default NoteAppBar
