import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class SearchResultContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picUrl: this.props.pictureUrl
        }
        
    }
    componentDidMount =() => {
        this.setState({picUrl:this.state.picUrl || "https://source.unsplash.com/random/?hike"})
    }
    render() {
        let picUrl = this.state.picUrl
        return (
            <div>
                <Link to={`/park/${this.props.id}`}><h2>{this.props.name}</h2></Link>
                <img width={"250px"} src={picUrl}></img>
                <div><p>{this.props.city} {this.props.state}</p></div>
            </div>
        )
    }
}
