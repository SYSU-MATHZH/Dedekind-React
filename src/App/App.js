import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './style.css';
import { IntlProvider, addLocaleData } from "react-intl";
import Navbar from '../components/nav';
import Home from '../pages/home/Home';
import Login from "../pages/home/components/login/Login";
import {Logined} from "../pages/home/components/logined/Logined";
import Index from '../pages/index';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";

const styles = theme => ({
    loginContainer: {
        flex: '1',
        marginLeft: "10px"
    },
});

addLocaleData([...en,...zh]);

class App extends Component {

    onTimelineLoad() {
        window.$('.main-content').css('max-width', 1200);
        window.$('.container-fluid').css('max-width', 1200);
    }

    render() {
        const { classes } = this.props;
        const {url} = this.props.match;
        const {login, register} = this.props;
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
                            <Route path="/users" component={Home}/>
                            <Route path="/students" component={Index}/>
                            <Route path="/volunteerTime" component={Index}/>
                            <Route path="/activities" component={Index}/>
                            <Route path="/applications" component={Index}/>
                            <Route path="/appeals" component={Index}/>
                            <Route path="/groups" component={Index}/>
                            <Route path="/login" component={Home}/>
                        </Switch>
                    </div>
                    <div className={classes.loginContainer}>
                        {this.props.userInfo.userId ?
                            <Logined history={this.props.history} userInfo={this.props.userInfo}/> :
                            <Login login={login} register={register}/>}
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
        localeMessage: localeMessage,
        userInfo: state.globalState.userInfo
    };
}

const connectedApp = connect(
    mapStateToProps
)(withRoot(withStyles(styles)(App)));

export { connectedApp as App };
