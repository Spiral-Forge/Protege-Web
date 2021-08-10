import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../Navbar/Button";
import './SignIn.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: "35ch",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 480,
    margin: "60px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid>
          {/* <Avatar style={avatarStyle}></Avatar> */}
          <h1>Login to start your journey</h1>
        </Grid>
        <div className={classes.root}>
          <TextField
            label="Username"
            fullWidth
            required
            style={{ marginTop: 30, marginBottom: 10 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            style={{ marginTop: 10, marginBottom: 30 }}
          />
        </div>

        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <div className='btn-container'>
            <Button buttonSize='btn-wide' buttonColor='blue'>
              Sign in
            </Button>
        </div>
        <Typography>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography>
          {" "}
          Already have an account?<Link href="#"> Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
