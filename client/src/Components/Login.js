import React, { useContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import styles from './css/Login.module.css';

import { TextField, Button, Divider } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import Axios from '../Axios/Axios';
import Toast from './Com/Toast';

import { context } from '../ContextStore/Store';
const Login = () => {
	//
	const contextData = useContext(context);
	const { user, setUser, setLogin, isLoggedIn } = contextData;

	//
	const history = useHistory();
	console.log(history);

	const changeHandler = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		console.log('submit handler');
		let msg;
		try {
			const result = await Axios.get(`/users/${user.username}`);

			const match = await bcrypt.compare(
				user.password,
				result.data.password
			);
			console.log('match ', match);

			console.log(result);
			if (match) {
				setLogin(true);
				msg = 'Login successful';
				window.localStorage.setItem('username', user.username);
				window.localStorage.setItem('password', result.data.password);
				history.push('/');
			} else {
				msg = 'Invalid details';
			}
		} catch (err) {
			msg = err;
			console.log(err);
		}
		Toast.makeToast(msg, Toast.LONG);
	};

	return (
		<div className={`app ${styles.login} container-fluid bg-white`}>
			<div
				className={`container  bg-white p-0 p-sm-2 p-md-4 ${styles.center}`}>
				<h5 className="my-2 mb-5 text-center">Login</h5>
				<form action="" onSubmit={submitHandler}>
					<TextField
						fullWidth
						id="standard-basic"
						label="Username"
						type="text"
						name="username"
						variant="outlined"
						value={user.username}
						onChange={changeHandler}
						required
					/>
					<TextField
						sx={{ my: 3 }}
						fullWidth
						id="standard-basic"
						label="Password"
						type="password"
						name="password"
						variant="outlined"
						value={user.password}
						onChange={changeHandler}
						required
					/>
					<Button variant="contained" type="submit">
						Login
					</Button>
					<Divider sx={{ my: 2 }}>
						<Link to="/account">
							<Button
								variant="text"
								sx={{ mx: 'auto', color: 'blue' }}>
								create account
							</Button>
						</Link>
					</Divider>
				</form>
			</div>
		</div>
	);
};

export default Login;
