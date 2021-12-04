import React, { useContext, useEffect } from 'react';
import styles from './css/Home.module.css';
import { MdOutlineSearch, MdPersonAdd } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
// material ui
import IconButton from '@mui/material/IconButton';
import { Menu, ListItemIcon } from '@mui/material';
// import  from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import { Link, useHistory } from 'react-router-dom';
import Item from './Item';

import { context } from '../ContextStore/Store';
const Home = () => {
	//
	let history = useHistory();

	//  context Store data
	const contextData = useContext(context);
	const {
		contacts,
		isLoggedIn,
		setLogin,
		getAllContacts,
		setUser,
		user,
		setAllContacts,
	} = contextData;

	useEffect(() => {
		if (window.localStorage.getItem('username')) {
			setUser({
				...user,
				username: window.localStorage.getItem('username'),
				password: window.localStorage.getItem('password'),
			});
			setLogin(true);
			getAllContacts();
		} else {
			history.push('/login');
		}
	}, [isLoggedIn]);

	//  menu item
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		console.log('menu close button');
	};

	const logoutHandler = (event) => {
		setAnchorEl(null);
		setLogin(false);
		setUser({
			username: '',
			password: '',
		});
		setAllContacts([]);
		window.localStorage.clear();
		history.push('/login');
	};

	return (
		<div className={`${styles.home}`}>
			<nav className={`${styles.nav}`}>
				<h5> Contacts List </h5>
				<div className={`${styles.icons}`}>
					<span className="">
						<Link to="/new_contact">
							<IconButton>
								<MdPersonAdd />
							</IconButton>
						</Link>
					</span>
					<span
						className=""
						onClick={() => {
							console.log('Search button');
						}}>
						<Link to="/search_contact">
							<IconButton aria-label="search">
								<MdOutlineSearch />
							</IconButton>
						</Link>
					</span>
					<span className="">
						<IconButton aria-label="dots" onClick={handleClick}>
							<BiDotsVerticalRounded />
						</IconButton>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}>
							<MenuItem onClick={handleClose}>
								{/* <Avatar /> */}
								Profile
							</MenuItem>
							<MenuItem onClick={handleClose}>
								My account
							</MenuItem>
							<MenuItem onClick={logoutHandler}>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</span>
				</div>
			</nav>
			{/* contacts list show here */}
			<div className={`${styles.contact_list}`}>
				{contacts.map((item, index) => {
					return (
						<Item
							key={index}
							value={item}
							// openDialogHandler={openDialogHandler}
						/>
					);
				})}
			</div>

			<footer className={`${styles.footer}`}>
				<small>Contacts</small>
			</footer>
		</div>
	);
};

export default Home;
