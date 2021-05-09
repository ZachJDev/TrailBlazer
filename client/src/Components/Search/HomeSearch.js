import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import useInputState from "../../hooks/useInputState";

export default function HomeSearch({ history }) {
  const [searchState, setSearchState] = useInputState("");
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?term=${searchState}`);
  };
  return (
    <div>
      <h1
        style={{
          paddingTop: "7rem",
          color: "white",
        }}
      >
        Trail Blazer
      </h1>
      <h3
        style={{
          color: "white",
        }}
      >
        Hike Your Way
      </h3>
      <InputGroup style={{ width: "70%", margin: "auto", marginTop: "10rem" }}>
        <Form.Control
          value={searchState}
          onChange={setSearchState}
          type="text"
          placeholder="Find your Trail"
        />
        <InputGroup.Append>
          <Button onClick={handleSearch}>Search!</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
