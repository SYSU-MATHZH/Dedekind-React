import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { CSSTransitionGroup } from 'react-transition-group';
import Config from '../Config';

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