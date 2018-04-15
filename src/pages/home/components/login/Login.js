import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import {Tabs} from 'antd';
import LoginForm from './LoginForm'
import RegisterForm from "./RegisterForm";

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../../withRoot';

const TabPane = Tabs.TabPane;
const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        height: "300px"
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }


    render() {
        const { classes } = this.props;
        const {login,register} = this.props;
        return (
            <Tabs defaultActiveKey="1" tabBarStyle={{textAlign: 'center'}} className={classes.container}>
                <TabPane tab="登录" key="1">
                    <LoginForm login={login}/>
                </TabPane>
                <TabPane tab="注册" key="2">
                    <RegisterForm register={register}/>
                </TabPane>
            </Tabs>
        )
    }
}

export default withRoot(withStyles(styles)(Login))

