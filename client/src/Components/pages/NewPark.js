import React, { Component } from "react";

export default class NewPark extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newParkName: "",
        newParkAddress: "",
        newParkCountry: "",
        newParkState: "",
        newParkZipCode: "",
        newParkCity: "",
        newParkGeoLoc: {},
        newParkDescription: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };
  handleFormUpdate = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <h1>Add new Park</h1>
        <section>
          <form onSubmit={this.handleSubmit}>
            <div className="new-park-name">
            <label htmlFor="newParkName">Name: </label>
              <input
                onChange={this.handleFormUpdate}
                value={this.state.newParkName}
                name="newParkName"
              ></input>
            </div>
            <div className="new-park-description">
            <div>
            <label htmlFor="newParkDescription">Description: </label>
            </div>
              <textarea
                onChange={this.handleFormUpdate}
                value={this.state.newParkDescription}
                name="newParkDescription"
              ></textarea>
            </div>
            <div className="new-park-loc">
              <h2>Park Location</h2>
              <div className="new-park-address">
              <label htmlFor="newParkAddress">Address: </label>
                <input
                  onChange={this.handleFormUpdate}
                  value={this.state.newParkAddress}
                  name="newParkAddress"
                ></input>
              </div>
              <div className="new-park-country">
              <label htmlFor="newParkCountry">Country: </label>
                <input
                  onChange={this.handleFormUpdate}
                  value={this.state.newParkCountry}
                  name="newParkCountry"
                ></input>
              </div>
              <div className="new-park-state">
              <label htmlFor="newParkState">State: </label>
                <input
                  onChange={this.handleFormUpdate}
                  value={this.state.newParkState}
                  name="newParkState"
                ></input>
              </div>
              <div className="new-park-city">
              <label htmlFor="newParkCity">City: </label>
                <input
                  onChange={this.handleFormUpdate}
                  value={this.state.NewParkCity}
                  name="NewParkCity"
                ></input>
              </div>
              <div className="new-park-zip-code">
              <label htmlFor="newParkZipCode">Zip Code: </label>
                <input
                  onChange={this.handleFormUpdate}
                  value={this.state.newParkZipCode}
                  name="newParkZipCode"
                ></input>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
}
