import React, { Component } from 'react'


export default class Park extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parkInfo: {},
            parkLoaded: false,
            fetchFailed: false
        }
    }

    componentDidMount = () => {
        let parkId = this.props.match.params.parkId
        let status;
        fetch(`/park/${parkId}`)
        .then(res => {
            status = res.status
            if(res.status !== 200) throw new Error("bad Fetch")
            else return res.json()})
        .then(parkInfo => {
            console.log(parkInfo)
            this.setState({parkInfo, parkLoaded: true})
        })
        .catch(e => {
            // I'll be creating a new 'notfound' component that will be told to render here
            this.setState({fetchFailed: true})
            console.log(status)
            console.log(e)
        })
    }
    render() {
        let park = ''
        if(this.state.fetchFailed) park = 'not Found'
        else parkName = this.state.parkInfo.name
        return (
            <div>
                <p>Park Page</p>
                <p>{park}</p>
            </div>
        )
    }
}
