import React, { Component } from "react";
import NewParkForm from '../NewParkForm'
export default class NewPark extends Component {
  constructor(props) {
    super(props)
    this.state = {
        formErrors: [],
    }

  }

  handleFormSubmit = (state) => {
      let body;
      let status;
      fetch("/park/new?_method=POST", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(state)
      })
      .then(res => {
          status = res.status;
            return res.json();
      })
      .then(resBody => {
        body = resBody;
        if(status !== 200) throw new Error()  
      })
      .catch(e => {
          if(status === 400) {
              this.setState({formErrors: body.errors})
          }
          if(status === 409) {
              console.log(body.errors)
          }
      })
  };

  render() {
    return (
     <div>
         <NewParkForm handleSubmit={this.handleFormSubmit} missing={this.state.formErrors}/>
     </div>
    );
  }
}
