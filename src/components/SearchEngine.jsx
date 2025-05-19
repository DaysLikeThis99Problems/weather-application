import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from "../Autocomplete/search";

function SearchEngine({ query, setQuery, search }) {
  const [searchData, setSearchData] = useState(null);
  //handler function
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(e);
    }
  };
  const handleSearchChange = (data) => { setSearchData(data); setQuery(data.label); };
  const renderData = (data) => {
    return Math.ceil(data*100000)/100000;
  };

  return (
    <div className="SearchEngine">
      {/* <h1>City Search</h1>  */}
      <Search onSearchChange={handleSearchChange} onClick={handleKeyPress}/>
      <button id="btn" onClick={search}><FontAwesomeIcon icon={faSearch} id="logo"/></button>
     <div id="Sdata">
     {searchData && ( 
        <div id="d"> 
          <h4>Selected City:</h4> 
          <p>{`Latitude: ${renderData(searchData.value.split(" ")[0])}`}</p> 
          <p>{`Longitude: ${renderData( searchData.value.split(" ")[1]) }`}</p> 
          <p>{`Population: ${searchData.population}`}</p>
          </div> 
        )}
     </div>
      

    </div>
  );
}

export default SearchEngine;