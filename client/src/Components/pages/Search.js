import React, { useState } from "react";
import SearchResultContainer from "../SearchResultContainer";
import FormInputText from "../FormInputText";

import useInputState from "../../hooks/useInputState";

export default function Search() {
  const [searchType, setSearchType] = useInputState("Park");
  const [searchTerm, setSearchTerm] = useInputState("");
  let [searchResults, setSearchResults] = useState([]);

 const handleSearch = () => {
    fetch(`/search/${searchType}`)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
       setSearchResults(results);
      });
  };

  return (
    <div>
      <p>Search page</p>
      <div className="search-div">
        <select name="searchType" onChange={setSearchType}>
          <option value="Park">Park</option>
          <option value="Trail">Trail</option>
        </select>
        <FormInputText value={searchTerm} handleChange={setSearchTerm} label="search" name="search" cssClass="search-input" />
        <button onClick={handleSearch}>submit!</button>
      </div>
      <section className="results">
        {searchResults.length > 0
          ? searchResults.map((park) => {
              return (
                <SearchResultContainer
                  key={park.parkId}
                  name={park.name}
                  city={park.city}
                  state={park.state}
                  pictureUrl={""}
                  id={park.parkId}
                />
              );
            })
          : "There's nothing to show!"}
      </section>
    </div>
  );
}
