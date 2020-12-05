import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import SearchResultContainer from "../SearchResultContainer";
import FormInputText from "../FormInputText";
import FormInputSelect from "../FormInputSelect";

import useInputState from "../../hooks/useInputState";

export default function Search() {
  const [searchType, setSearchType] = useState("Park");
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
  const handleDropdown = (type) => {
    setSearchType(type);
  };

  return (
    <div>
      <p>Search page</p>
      <Form
        style={{
          width: "25%",
          margin: "0 auto",
        }}
      >
        <InputGroup className="">
          <DropdownButton
            as={InputGroup.Prepend}
            title={searchType}
            variant="outline-primary"
            
          >
            <Dropdown.Item eventKey="park" onSelect={handleDropdown}>
              Park
            </Dropdown.Item>
            <Dropdown.Item eventKey="Trail" onSelect={handleDropdown}>
              Trail
            </Dropdown.Item>
          </DropdownButton>
          <FormInputText
            value={searchTerm}
            handleChange={setSearchTerm}
            label="search"
            name="search"
            cssClass="search-input"
          /><InputGroup.Append>

            <Button onClick={handleSearch}>submit!</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
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
