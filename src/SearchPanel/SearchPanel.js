import React from 'react';
import SearchByDate from './SearchByDate/SearchByDate';
import './SearchPanel.css';

const SearchPanel = (props) => {
    return (
        <div className="search-panel">
            <SearchByDate {...props} />
        </div>
    );
}

export default SearchPanel;