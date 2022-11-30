import React from 'react';

import './SearchByDate.css';

const SearchByDate = (props) => {

    const { searchDates } = props;

    const handleInputChange = (e) => {
        props.handleSearchDateChange(e.target.name, e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.displaySearchResults();
    }

    const handleDeleteFilter = () => {
        props.deleteFilter();
    }
    
    return (
        <form onSubmit={e => handleFormSubmit(e)}>
            <div className="from">
                <span>From Date:</span>
                <label htmlFor='from-date'><input id="from-date" name="fromDate" type="text" value={searchDates.fromDate} placeholder="YYYY-MM-DD" onChange={e => handleInputChange(e)} /></label>
                <label htmlFor='from-time'><input id="from-time" name="fromTime" type="text" value={searchDates.fromTime} placeholder="HH:MM" onChange={e => handleInputChange(e)} /></label>
            </div>
            <div className="to">
                <span>To Date:</span>
                <label htmlFor='to-date'><input id="to-date" name="toDate" type="text" value={searchDates.toDate} placeholder="YYYY-MM-DD" onChange={e => handleInputChange(e)} /></label>
                <label htmlFor='to-time'><input id="to-time" name="toTime" type="text" value={searchDates.toTime} placeholder="HH:MM" onChange={e => handleInputChange(e)} /></label>
            </div>
            <div className='button-container'>
                <button type="submit">Search</button>
            </div>
            <div>
                <button type="button" onClick={handleDeleteFilter}>Delete filter</button>
            </div>
        </form>
    );
}

export default SearchByDate;