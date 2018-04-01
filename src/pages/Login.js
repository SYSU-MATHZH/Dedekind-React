import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import withRoot from '../withRoot';

const styles = theme => ({
  textField: {
      margin: theme.spacing.unit,
      display: "block",
      width: 200,
      padding: ['.3em', '1em', '.5em'],
  },
  main: {
    width: '100%',
    minHeight: '600px',
    height: '100%',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {      
    maxWidth: 345,
    margin: 'auto',
    padding: ['.3em', '1em', '.5em'],
  },
  img: {
    height: 250,
  },
});
class Login extends React.Component {
  state = {  //先声明变量并初始化
    name: '',
    password: '',
    error: null,
  };
  
  handleChange = name => (event) => {
    this.setState({[name]: event.target.value})
  };
  handleKeyDown = (event) => { //按下enter键，触发login事件
    switch (event.keyCode) {
      case 13:
          this.login();
          break;
      default:
    }
  };

  login = () => {};

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.main}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.img}
            image="/static/img/logo.png"
            title={"Login"}
          />
          <CardContent >
            <Typography gutterBottom variant="headline" component="h2" className={classes.textField}>
            登录
            </Typography>
            <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("name")}
            />
            <FormControl className={classes.textField}>
                <InputLabel htmlFor="Password">Password</InputLabel>
                <Input id="password" type="password" value={this.state.password}
                        onChange={this.handleChange("password")}/>
                {
                    this.state.error ?
                    <FormHelperText error>{this.state.error}</FormHelperText>
                    : null
                }
            </FormControl>
          </CardContent>
          <CardActions>
            <Button 
              onClick={this.login}
              variant="raised" 
              color="secondary" 
              className={classes.textField}
            >
                登录
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Login));