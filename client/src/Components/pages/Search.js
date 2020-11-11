import React, { Component } from "react";
import SearchResultContainer from "../SearchResultContainer";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "Park",
      searchTerm: "",
      searchResults: [],
    };
  }
  handleSearchChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSearch = () => {
    fetch(`/search/${this.state.searchType}`)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        this.setState({ searchResults: results });
      });
  };
  render() {
    return (
      <div>
        <p>Search page</p>
        <div className="search-div">
          <select name="searchType" onChange={this.handleSearchChange}>
            <option value="Park">Park</option>
            <option value="Trail">Trail</option>
          </select>
          <input
            type="text"
            name="searchTerm"
            onChange={this.handleSearchChange}
            value={this.state.searchTerm}
          />
          <button onClick={this.handleSearch}>submit!</button>
        </div>
        <section className="results">
          {this.state.searchResults.length > 0
            ? this.state.searchResults.map((park) => {
                console.log(park);
                return (
                  <SearchResultContainer
                    key={park.parkId}
                    name={park.name}
                    city={park.city}
                    state={park.state}
                    pictureUrl ={""}
                  />
                );
              })
            : "There's nothing to show!"}
        </section>
      </div>
    );
  }
}
