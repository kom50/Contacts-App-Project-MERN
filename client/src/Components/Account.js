import { Button, TextField, Divider } from '@mui/material';
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

import { Link, useHistory } from 'react-router-dom';
import styles from './css/Account.module.css';

import axios from '../Axios/Axios.js';
import Toast from './Com/Toast.js';

const Account = () => {
	// state
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		c_password: '',
	});
	let history = useHistory();
	console.log(history);

	const changeHandler = (event) => {
		console.log('Change handler');
		const name = event.target.name;
		const value = event.target.value;
		setUser({ ...user, [name]: value });
	};
	const submitHandler = async (event) => {
		// console.log('Submit handler ');
		let msg = '';
		if (
			!user.username ||
			!user.email ||
			!user.password ||
			!user.c_password
		) {
			msg = 'Pls fill all filed';
		} else if (user.password !== user.c_password) {
			msg = 'Password not matched';
		} else {
			//password hashing
			const hash = await bcrypt.hash(user.password, 10);
			console.log(hash);
			user.password = hash;
			console.log(user);
			delete user.c_password;

			try {
				const result = await axios.post('/users', {
					...user,
				});
				console.log(result);
				msg = 'Account created successful';

				setUser({
					username: '',
					email: '',
					password: '',
					c_password: '',
				});
			} catch (err) {
				msg = err;
				console.log('Error', err);
			}
			history.push('/login');
		}
		console.log(!user.username);

		console.log(msg);
		Toast.makeToast(msg, Toast.LONG);
	};
	return (
		<div className={`app ${styles.account} container-fluid bg-white`}>
			<div className={`container-fluid px-0 ${styles.center}`}>
				<h5 className="my-2 mb-3 text-center mt-4 ">
					Create Account for store your contacts list
				</h5>
				<form action="" className="p-1 p-sm-2 p-md-4">
					<TextField
						variant="outlined"
						type="text"
						fullWidth
						label="Username"
						name="username"
						value={user.username}
						onChange={changeHandler}
					/>

					<TextField
						sx={{ mt: 2 }}
						variant="outlined"
						type="email"
						fullWidth
						label="Email"
						name="email"
						value={user.email}
						onChange={changeHandler}
					/>
					<TextField
						sx={{ mt: 2 }}
						variant="outlined"
						type="password"
						fullWidth
						label="Password"
						name="password"
						value={user.password}
						onChange={changeHandler}
					/>
					<TextField
						sx={{ mt: 2 }}
						variant="outlined"
						type="password"
						fullWidth
						label="Confirm Password"
						name="c_password"
						value={user.c_password}
						onChange={changeHandler}
					/>

					<Button
						sx={{ my: 2 }}
						variant="contained"
						onClick={submitHandler}>
						Submit
					</Button>

					{/* <div className="text-center"> */}
					<Divider>
						<Link to="/login">
							<Button sx={{ mt: 0 }} variant="text">
								Login
							</Button>
						</Link>
					</Divider>
					{/* </div> */}
					{/* <div className="form-group mt-1">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							className="form-control"
						/>
					</div>
					<div className="form-group mt-1">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
						/>
					</div>
					<div className="form-group mt-1">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							className="form-control"
						/>
					</div>
					<div className="form-group mt-1">
						<label htmlFor="c_password">Confirm Password</label>
						<input
							type="password"
							name="c_password"
							className="form-control"
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary mt-3 mb-4"
						onClick={submitHandler}>
						Submit
					</button> */}
				</form>
			</div>
		</div>
	);
};

export default Account;
