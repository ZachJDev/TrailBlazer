import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleFormUpdate = (event) =>this.setState({[event.target.name]: event.target.value})

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("/auth/login")
        .then(response => response.json())
        .then(paylaod => console.log(paylaod))
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input onChange={this.handleFormUpdate} type="text" name="username" value={this.state.username}></input>
                    <input onChange={this.handleFormUpdate} type="password" name="password" value={this.state.password}></input>
                    <input type="submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        )
    }
}
