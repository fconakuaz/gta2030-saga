import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { logout  } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import JournalEntries from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogOut = () => {
        dispatch( logout() );
    };

    const handleAddNew = (e) => {
        e.preventDefault();
        dispatch( startNewNote() );
    };

    return (
        <div>
            <aside className="journal__sidebar animate__animated animate__fadeIn animate__faster">
                <div className="journal__sidebar-navbar">
                    <h3 className="mt-3">
                        <i className="fa fa-moon"></i>
                        <span style={{color: '#545454'}}>{ name }</span>
                    </h3>

                    <button 
                        className="btn azure" 
                        onClick={ handleLogOut } 
                    >
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
                <div 
                    className = "journal__new-entry"
                    onClick   = { handleAddNew }
                >
                    <i className="far fa-calendar-plus fa-5x"></i>
                    <p className="mt-2" style={{color: '#545454'}} >New entry</p>
                </div>
                <JournalEntries />
            </aside>
        </div>
    )
}
