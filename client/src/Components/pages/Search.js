import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import SearchResultContainer from "../SearchResultContainer";
import TrailCard from '../TrailCard'
import FormInputText from "../FormInputs/FormInputText";

import useInputState from "../../hooks/useInputState";

export default function Search() {
  const [searchType, setSearchType] = useState("Park");
  const [searchTerm, setSearchTerm] = useInputState("");
  let [searchResults, setSearchResults] = useState([]);
  let [resultsList, setResultsList] = useState([]);

  const handleSearch = () => {
    fetch(`/search/${searchType}?q=${searchTerm}`)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        setSearchResults(results);
      });
  };
  const handleDropdown = (type) => {
    setSearchType(type);
  };
  useEffect(() => {
    if( searchResults.length > 0) {
      if(searchType === 'Trail') {
        console.log(searchResults)
      setResultsList(searchResults.map(trail => (
        <TrailCard
        key={trail.trailId}
        park={trail.park}
        trailId={trail.trailId}
        name={trail.name}
        description={trail.description}
        length={trail.length}
        />
      )))
      }
      else if(searchType === 'Park') {
        setResultsList(searchResults.map((park) => {
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
        }))
      }
    }
  
  }, [searchResults])
  
  return (
    <div>
      <p>Search page</p>
      <Form
        style={{
          width: "25%",
          margin: "0 auto",
        }}
      >
        <FormInputText
          value={searchTerm}
          handleChange={setSearchTerm}
          label="search"
          name="search"
          cssClass="search-input"
          prepend={
            <React.Fragment>
              <DropdownButton
                as={InputGroup.Prepend}
                title={searchType}
                variant="outline-primary"
              >
                <Dropdown.Item eventKey="Park" onSelect={handleDropdown}>
                  Park
                </Dropdown.Item>
                <Dropdown.Item eventKey="Trail" onSelect={handleDropdown}>
                  Trail
                </Dropdown.Item>
              </DropdownButton>
            </React.Fragment>
          }
          append={
            <InputGroup.Append>
              <Button onClick={handleSearch}>submit!</Button>
            </InputGroup.Append>
          }
        />
      </Form>
      <section className="results">
        {searchResults.length > 0
          ? resultsList
          : "There's nothing to show!"}
      </section>
    </div>
  );
}
