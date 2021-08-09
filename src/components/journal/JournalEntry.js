import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntry = ({ id, body, date, title, url }) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( activeNote( id, { body, date, title, url } ) );   
    };

    url = url || 'https://images.vectorhq.com/images/istock/previews/9720/97203331-calendar-icon-vector-illustration-calendar-icon-calendar-ic.jpg';

    return (
        <div 
            className = "journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick   = { handleEntryClick }
        >
           { 
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize  : 'cover',
                        backgroundImage : `url(${ url })`
                    }}
                >
                </div>
            } 

            <div className="journal__entry-body">
                <p className="journal__entry-title">{ title }</p>
                <p className="journal__entry-content">{ body }</p>
            </div>

            <div className="journal__entry-date-box">
                <span style={{color: '#545454'}}>{ noteDate.format('dddd') }</span>
                <h4 >{ noteDate.format('d') }</h4>
            </div>
        </div>
    )
}

export default JournalEntry
