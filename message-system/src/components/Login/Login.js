import React ,{ useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Route, Redirect } from 'react-router';


const redirect = false;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


export default function Login() {
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);

  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    fetch('http://167.172.162.59:9000/users/login', {
        method: 'POST',
        headers:  new Headers ({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*'
        }),
        body: JSON.stringify({ user: username, password: password})
        }).then(data => {
            console.log('Success:', data.status);
            if(data.status === 201){
                setLogin(true);
                var isLogin = JSON.parse("true".toLowerCase());
                sessionStorage.setItem('login', isLogin); 

            }
            else{
                setLogin(false);
                var isLogin = JSON.parse("true".toLowerCase());
                sessionStorage.setItem('login', false); 
            }
          })
          

  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleLogin} ref={form} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="username"
            autoComplete="email"
            value={username}
            onChange={onChangeUsername}
            validations={[required]}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          {login ? <Redirect to="/admin/recieve-messages" /> : null}
          { login === false ? <div>Something wrong, try again</div>: null}
          
            
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}