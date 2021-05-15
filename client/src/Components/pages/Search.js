import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

import SearchResultContainer from "../Search/SearchResultContainer";
import TrailCard from "../Cards/TrailCard";
import FormInputText from "../FormInputs/FormInputText";

import useInputState from "../../hooks/useInputState";
import withHelmet from "../../HigherOrderComponents/withHelmet";
import { useMutation } from "react-query";
import { searchReq } from "../../API/API";

function Search({ location, history }) {
  const params = new URLSearchParams(location.search);
  let initSearchType = params.get("type");
  if (!(initSearchType === "Park" || initSearchType === "Trail")) {
    // stop any errors with manually setting the URL
    initSearchType = "Park";
  }

  const [searchType, setSearchType] = useState(initSearchType);
  const [searchTerm, setSearchTerm] = useInputState(params.get("term") || "");
  let [searchResults, setSearchResults] = useState({});
  let [resultsList, setResultsList] = useState([]);

  const searchSubmit = useMutation(
    ["search", searchTerm, searchType],
    ({ searchType, searchTerm }) => searchReq({ searchType, searchTerm })(),
    {
      onSuccess: (results) => {
        params.set("type", searchType);
        params.set("term", searchTerm);
        history.replace({ search: params.toString() });
        setSearchResults(results);
      },
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    searchSubmit.mutate({ searchType, searchTerm });
  };
  const handleDropdown = (type) => {
    setSearchType(type);
  };
  useEffect(() => {
    const { results, type } = searchResults;
    if (results?.length > 0) {
      if (type === "trail") {
        setResultsList(
          results.map((trail) => (
            <TrailCard
              key={`trail-${trail.trailId}`}
              park={trail.park}
              trailId={trail.trailId}
              name={trail.name}
              description={trail.description}
              length={trail.length}
            />
          ))
        );
      } else if (type === "park") {
        setResultsList(
          results.map((park) => {
            return (
              <SearchResultContainer
                key={`park-${park.parkId}`}
                name={park.name}
                city={park.city}
                state={park.state}
                pictureUrl={""}
                id={park.parkId}
              />
            );
          })
        );
      }
    }
  }, [searchResults, history]);

  useEffect(() => {
    if (searchTerm !== "") {
      searchSubmit.mutate({ searchType, searchTerm });
    }
  }, []); // I'm going to leave this emptyDeps warning for now...

  return (
    <div className={"search-page"}>
      <h1 className={"header"}> Find your Trail:</h1>
      <Form
        style={{
          width: "25%",
          margin: "0 auto",
        }}
        onSubmit={handleSearch}
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
              <Button type="submit">submit!</Button>
            </InputGroup.Append>
          }
        />
      </Form>
      <section className="results">
        {searchResults.results?.length > 0
          ? resultsList
          : "There's nothing to show!"}
      </section>
    </div>
  );
}

export default withHelmet({ title: "Find Your Trail" })(Search);
