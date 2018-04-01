import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { IntlProvider, addLocaleData } from "react-intl";
import Navbar from '../components/nav';
import Home from '../pages/Home';
import Index from '../pages/index';
import Login from '../pages/Login';

import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";

addLocaleData([...en,...zh]);

class App extends Component {

    onTimelineLoad() {
        window.$('.main-content').css('max-width', 1200);
        window.$('.container-fluid').css('max-width', 1200);
    }

    render() {
        return (
            <IntlProvider locale={this.props.locale} messages={this.props.localeMessage}>
                <div className="App">
                    <Navbar location={this.props.location} />
                    <div className="main-content">
                        <Switch>
                            {/* <Route path="/(|students|volunteerTime|activities|applications|appeals)" 
                            render={() =>
                                <Home onTimelineLoad={() => this.onTimelineLoad()} />
                            }/> */}
                            <Route path="/publicities" component={Index}/>
                            <Route path="/users" component={Index}/>
                            <Route path="/students" component={Index}/>
                            <Route path="/volunteerTime" component={Index}/>
                            <Route path="/activities" component={Index}/>
                            <Route path="/applications" component={Index}/>
                            <Route path="/appeals" component={Index}/>
                            <Route path="/groups" component={Index}/>
                            <Route path="/login" component={Login}/>
                        </Switch>
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

function mapStateToProps(state) {
    const { locale, localeMessage } = state.selectLocale;
    return {
        locale: locale,
        localeMessage: localeMessage
    };
}

const connectedApp = connect(
    mapStateToProps
)(App);

export { connectedApp as App };
