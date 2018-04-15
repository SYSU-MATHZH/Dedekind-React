import React,{Component} from 'react'
import {Input,Form, Icon,Button} from 'antd'
import style from './style.css'
import {post} from "../../../../utils/fetch";
import { withStyles } from 'material-ui/styles';
import withRoot from '../../../../withRoot';

const FormItem = Form.Item;
const styles = theme => ({
    formStyle: {
        width: "70%",
        marginLeft: "15%",
        textAlign: "center",
        paddingTop: "20px"
    },
    loginButton: {
        width: "60%"
    }
});

class RegisterFormCom extends Component{
    constructor(props){
        super(props);
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.register(values);
            }
        });
    };


    render(){
        const { classes } = this.props;
        const {getFieldDecorator} = this.props.form;
        return(
            <Form onSubmit={this.handleRegister} className={classes.formStyle}>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '请输入用户名!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('passwordRe', {
                        rules: [{required: true, message: '请输入密码!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Repeat password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button className={classes.loginButton} type="primary" htmlType="submit">
                        注册
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const RegisterForm = Form.create()(RegisterFormCom);

export default withRoot(withStyles(styles)(RegisterForm))