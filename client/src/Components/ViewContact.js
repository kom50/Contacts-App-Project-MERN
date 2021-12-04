import React, { useContext } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Link, useLocation, useHistory } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Toast from './Com/Toast';
import Axios from '../Axios/Axios';

import styles from './css/ViewContact.module.css';
import { context } from '../ContextStore/Store';

const ViewContact = () => {
	const contextData = useContext(context);
	const { user } = contextData;

	let history = useHistory();

	let location = useLocation();
	console.log('location ', location.state.value);
	let data = location.state.value;

	let arr = [];
	let keys = [
		'First Name ',
		'Last Name',
		'Phone No',
		'Email',
		'Address',
		'Date of Birth',
	];
	for (let key in data) {
		arr.push(data[key]);
	}

	console.log(arr);

	const deleteHandler = async (event) => {
		console.log('delete handler');
		let msg;
		try {
			const result = await Axios.delete(
				`contacts/${arr[0]}/?username=${user.username}`
			);
			console.log('delete ', result);
			history.push('/');
			msg = 'Delete contacts';
		} catch (err) {
			msg = err;
		}
		Toast.makeToast(msg, Toast.LONG);
	};
	return (
		<div className={`app ${styles.view}`}>
			<nav className={`${styles.nav} `}>
				<span className="">
					<Link to="/">
						<IconButton sx={{ mx: 1 }}>
							<KeyboardArrowLeftIcon />
						</IconButton>
					</Link>
				</span>
				<span className="">
					<IconButton aria-label="edit icon" sx={{ mx: 1 }}>
						<StarBorderIcon />
					</IconButton>
				</span>
				<span className="">
					<Link
						to={{
							pathname: '/edit_contacts',
							state: location.state.value,
						}}>
						<IconButton aria-label="edit icon" sx={{ mx: 1 }}>
							<EditIcon />
						</IconButton>
					</Link>
				</span>
				<span className="">
					<IconButton
						aria-label="delete icon"
						sx={{ mx: 1 }}
						onClick={deleteHandler}>
						<DeleteIcon />
					</IconButton>
				</span>
			</nav>
			<div className={`${styles.view_contact_list}`}>
				<Box
					sx={{
						display: 'flex',
						'& > :not(style)': {
							m: 1,
							py: 6,
							px: 2,
							width: 310,
							height: 300,
						},
					}}>
					<Paper variant="outlined">
						{arr.map((item, index) => {
							return (
								<Typography sx={{ m: 1 }} key={index}>
									<span className={`${styles.title}`}>
										{keys[index]}:{' '}
									</span>
									{item}
								</Typography>
							);
						})}
					</Paper>
				</Box>
			</div>
		</div>
	);
};

export default ViewContact;
