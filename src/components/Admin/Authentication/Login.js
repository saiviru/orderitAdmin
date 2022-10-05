import React, { useEffect } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Paper,
	Box,
	Grid,
	Typography,
} from '@material-ui/core';
import { LocalDining } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Copyright from '../../Common/Copyright';
import Cookies from 'universal-cookie';
import { useForm } from 'react-hook-form';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(../images/foodlogin.jpeg)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
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

function Login() {
	const { register, handleSubmit, watch, formState: { errors }, } = useForm();
	const classes = useStyles();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [login, setLogin] = React.useState(false);
	
	useEffect = () => {
		document.title = 'Order It - Login';
	};

	//handling submit button
	const handleLogin = () => {
		// prevent the form from refreshing the whole page
		// e.preventDefault();
		// make a popup alert showing the "submitted" text
		const configuration = {
			method: 'post',
			url: 'api/authenticate',
			data: {
				email,
				password,
			},
		};
		axios(configuration)
			.then((result) => {
				setLogin(true);
				cookies.set('TOKEN', result.data.token, {
					path: '/',
				});
				window.location.href = '/dashboard';
			})
			.catch((error) => {
				error = new Error();
			});
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LocalDining />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} onSubmit={ handleSubmit(handleLogin)} noValidate>
						<TextField
							{...register('email', {
								required: true,
								maxLength: 50,
								pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
							})}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoFocus
						/>
						{console.log("the errors part:",errors)}
						{errors?.email?.type === 'required' && <p>This field is required</p>}
						{errors?.email?.type === 'pattern' && <p>Please add the email in right format</p>}
						<TextField
						{...register('password',{
							required: true,
							minLength: {
							  value: 8,
							  message: "Password must have at least 8 characters"
							}
						  })}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password"
						/>
						{errors?.password?.type === 'required' && <p>Please enter a password</p>}
						<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							// onClick={(e) => handleLogin(e)}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default Login;