import { useContext, useState, useEffect } from 'react';
import { IconButton, TextField } from '@mui/material';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import styles from './css/SearchContact.module.css';
import Item from './Item';

import { context } from '../ContextStore/Store';

const SearchContact = () => {
	const { contacts } = useContext(context);

	const [value, setValue] = useState('');
	const [filteredContacts, seFilteredContacts] = useState(contacts);

	// let filteredContacts = [];
	const filter = (value) => {
		seFilteredContacts(
			contacts.filter((data, index) => {
				console.log(data);
				console.log(data.first_name.includes(value));
				return data.first_name.includes(value);
			})
		);
		console.log('filtered data, ', filteredContacts);
	};

	const findHandler = (event) => {
		const value = event.target.value;
		setValue(value);
		console.log(event.target.value);

		filter(value);
	};

	//  clear button
	const isOpen = Boolean(value);
	console.log('open ', isOpen);

	const clearHandle = () => {
		setValue('');
		filter('');
	};

	useEffect(() => {
		console.log('search effect ', value);
	}, [value, filteredContacts]);

	return (
		<div className={`app ${styles.search}`}>
			<nav className={`${styles.nav} `}>
				<span className="">
					<Link to="/">
						<IconButton>
							<KeyboardArrowLeftIcon />
						</IconButton>
					</Link>
				</span>
				<span className="">
					<TextField
						fullWidth
						type="text"
						placeholder="Search..."
						variant="standard"
						value={value}
						onChange={findHandler}
					/>
				</span>
				<span className="">
					<IconButton aria-label="close" onClick={clearHandle}>
						{isOpen && <MdClose />}
					</IconButton>
				</span>
			</nav>
			<div className={`${styles.search_contact_list}`}>
				{filteredContacts.map((item, index) => {
					return <Item key={index} value={item} />;
				})}
			</div>
			<footer className={`${styles.footer}`}>
				<small>Contacts</small>
			</footer>
		</div>
	);
};

export default SearchContact;
