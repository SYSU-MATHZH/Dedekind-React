import React from 'react'
import style from './style.css'
import {Button} from 'antd'

import { withStyles } from 'material-ui/styles';
import withRoot from '../../../../withRoot';

const styles = theme => ({
    container: {
        height: "300px",
        width: "285px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "20px",
        backgroundColor: "#fff",
    },
    centerP :{
        margin: "25px 0"
    }
});

export const Logined = (props) => {
    const { classes } = this.props;
    return(
    <div className={classes.container}>
        <p>欢迎：{props.userInfo.username}</p>
        <p className={classes.centerP}>光临我的博客~</p>
        {props.userInfo.userType === 'admin' ?
            <Button onClick={() => props.history.push('/admin')} type="primary">点击进入管理页面</Button> : null}
    </div>);
};