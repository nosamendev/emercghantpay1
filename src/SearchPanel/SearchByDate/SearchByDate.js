import React, { useState, useRef } from 'react';

import './SearchByDate.css';

const SearchByDate = (props) => {

    const { searchDates } = props;

    const [validation, setValidation] = useState({
        fromDate: '',
        fromTime: '',
        toDate: '',
        toTime: ''
    });

    const fromDateRef = useRef(null);
    const fromTimeRef = useRef(null);
    const toDateRef = useRef(null);
    const toTimeRef = useRef(null);


    const handleInputChange = (e) => {
        props.handleSearchDateChange(e.target.name, e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isFormValid = true;

        setValidation(prevState => ({...prevState, fromDate: "", fromTime: "", toDate: "", toTime: ""}));

        if(!validateDate(fromDateRef.current.value)) {
            setValidation(prevState => ({...prevState, fromDate:  "Date must be YYYY-MM-DD"}));
            isFormValid = false;
        }

        if (!validateTime(fromTimeRef.current.value)) {
            setValidation(prevState => ({...prevState, fromTime:  "Time must be HH:MM"}));
            isFormValid = false;
        }

        if(!validateDate(toDateRef.current.value)) {
            setValidation(prevState => ({...prevState, toDate:  "Date must be YYYY-MM-DD"}));
            isFormValid = false;
        }

        if (!validateTime(toTimeRef.current.value)) {
            setValidation(prevState => ({...prevState, toTime:  "Time must be HH:MM"}));
            isFormValid = false;
        }

        if(isFormValid) {
            props.displaySearchResults();
        }
        
    }

    const handleDeleteFilter = () => {
        setValidation(prevState => ({...prevState, fromDate: "", fromTime: "", toDate: "", toTime: ""}));
        props.deleteFilter();
    }

    const validateDate = (date) => {
        const dateCond = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        return dateCond.test(date);
    }

    const validateTime = (time) => {
        const timeCond = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ ;
        return timeCond.test(time);
    }
    
    return (
        <form className="search-form" onSubmit={e => handleFormSubmit(e)}>
            <div className='fields'>
                <div className="from">
                    <span>From Date:</span>
                    <label htmlFor='from-date'>
                        <input ref={fromDateRef} id="from-date" name="fromDate" type="text" value={searchDates.fromDate} placeholder="YYYY-MM-DD" onChange={e => handleInputChange(e)} />
                        <span className="error">{validation.fromDate}</span>
                    </label>
                    
                    <label htmlFor='from-time'>
                        <input ref={fromTimeRef} id="from-time" name="fromTime" type="text" value={searchDates.fromTime} placeholder="HH:MM" onChange={e => handleInputChange(e)} />
                        <span className="error">{validation.fromTime}</span>
                    </label>
                </div>
                <div className="to">
                    <span>To Date:</span>
                    <label htmlFor='to-date'>
                        <input ref={toDateRef} id="to-date" name="toDate" type="text" value={searchDates.toDate} placeholder="YYYY-MM-DD" onChange={e => handleInputChange(e)} />
                        <span className="error">{validation.toDate}</span>
                    </label>
                    <label htmlFor='to-time'>
                        <input ref={toTimeRef} id="to-time" name="toTime" type="text" value={searchDates.toTime} placeholder="HH:MM" onChange={e => handleInputChange(e)} />
                        <span className="error">{validation.toTime}</span>
                    </label>
                </div>
            </div>
            <div className='buttons'>
                <div>
                    <button type="submit">Search</button>
                </div>
                <div>
                    <button className='delete-button' type="button" onClick={handleDeleteFilter} title="Remove Filter"></button>
                </div>
            </div>
        </form>
    );
}

export default SearchByDate;