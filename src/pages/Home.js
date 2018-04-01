import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    constructor() {
        super();
        this.state = { };
    }

    render() {
        return (
            <div className="home">
Home
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Home);