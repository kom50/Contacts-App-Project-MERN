import React, { useState, useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { BsCheck2 } from 'react-icons/bs';

import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EventIcon from '@mui/icons-material/Event';

// for date
import 'date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import styles from './css/NewContact.module.css';

import { context } from '../ContextStore/Store';
import Axios from '../Axios/Axios';
import Toast from './Com/Toast';

let firstName; // for update contacts
const NewContact = () => {
	//
	const history = useHistory();

	const contextData = useContext(context);
	const { user } = contextData;

	const [contactsDetails, setContactsDetails] = useState({
		first_name: '',
		last_name: '',
		phone_no: '',
		email: '',
		address: '',
		dob: /* '01/01/2000' */ new Date().toLocaleDateString(),
	});

	const changeHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		// first_name not contains any white space
		if (name === 'first_name') {
			value = event.target.value.trim();
		}
		setContactsDetails({
			...contactsDetails,
			[name]: value,
		});
	};
	//  api/contacts/ki/?username=kom50
	const submitHandler = async (event) => {
		console.log('submit handler');
		let msg;
		const { first_name, last_name, phone_no, email, address, dob } =
			contactsDetails;
		if (
			!first_name ||
			!last_name ||
			!phone_no ||
			!email ||
			!address ||
			!dob
		) {
			msg = 'Plz fill all fields';
		} else {
			if (!isEdit) {
				console.log('new contacts');
				try {
					/* const result =  */ await Axios.post(
						`/contacts/?username=${user.username}`,
						contactsDetails
					);

					contextData.contacts.push({ ...contactsDetails });
					msg = 'New Contacts added';
					// set initial value
					setContactsDetails({
						first_name: '',
						last_name: '',
						phone_no: '',
						email: '',
						address: '',
						dob: '01/01/2000' /* new Date().toLocaleDateString() */,
					});
					history.push('/');
				} catch (err) {
					msg = err;
				}
			} else {
				try {
					/* const result =  */ await Axios.put(
						`/contacts/${firstName}/?username=${user.username}`,
						contactsDetails
					);

					msg = 'Contacts updated';
					setContactsDetails({
						first_name: '',
						last_name: '',
						phone_no: '',
						email: '',
						address: '',
						dob: '01/01/2000',
					});
					history.push('/');
				} catch (err) {
					msg = err;
				}
			}
		}
		Toast.makeToast(msg, Toast.LONG);
	};

	//
	const location = useLocation();
	let [isEdit, setEdit] = React.useState(false);
	React.useEffect(() => {
		// for  contacts Edit
		if (location.state) {
			setContactsDetails({ ...location.state });
			setEdit(true);
			firstName = location.state.first_name;
		}
	}, []);
	return (
		<div className={`${styles.new_contact} app `}>
			<nav className={`${styles.nav}`}>
				<div className={`${styles.icons} `}>
					<p className={`${styles.icon} ps-3`}>
						<Link to="/">
							<IconButton aria-label="close">
								<MdClose />
							</IconButton>
						</Link>
					</p>
					<p className="ms-2">New Contact</p>
					<p className={`${styles.icon} ms-auto pe-3`}>
						<IconButton aria-label="close" onClick={submitHandler}>
							<BsCheck2 />
						</IconButton>
					</p>
				</div>
			</nav>
			<div
				className={`${styles.form} container-fluid mx-auto p-3 p-md-4`}>
				<Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 3 }}>
					<AccountCircle
						sx={{ color: 'action.active', mr: 1, my: 0.5 }}
					/>
					<TextField
						id=""
						label="First Name"
						variant="standard"
						name="first_name"
						value={contactsDetails.first_name}
						onChange={changeHandler}
						required
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
					<AccountCircle
						sx={{ color: 'action.active', mr: 1, my: 0.5 }}
					/>
					<TextField
						id="input-with-sx"
						label="Last Name"
						variant="standard"
						name="last_name"
						value={contactsDetails.last_name}
						onChange={changeHandler}
						required
					/>
				</Box>

				<Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
					<PhoneIcon
						sx={{ color: 'action.active', mr: 1, my: 0.5 }}
					/>
					<TextField
						id="input-with-sx"
						label="Phone No"
						type="number"
						variant="standard"
						name="phone_no"
						value={contactsDetails.phone_no}
						onChange={changeHandler}
						required
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
					<EmailOutlinedIcon
						sx={{ color: 'action.active', mr: 1, my: 0.5 }}
					/>
					<TextField
						id="input-with-sx"
						type="email"
						label="Email"
						variant="standard"
						name="email"
						value={contactsDetails.email}
						onChange={changeHandler}
						required
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
					<AccountBoxIcon
						sx={{ color: 'action.active', mr: 1, my: 0.5 }}
					/>
					<TextField
						id="input-with-sx"
						type="text"
						label="Address"
						variant="standard"
						name="address"
						value={contactsDetails.address}
						onChange={changeHandler}
						required
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 3 }}>
					<EventIcon
						sx={{ color: 'action.active', mr: 1, my: 0.5 }}
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							// defaultValue="01/12/2021"
							name="dob"
							value={contactsDetails.dob}
							onChange={(value) => {
								setContactsDetails({
									...contactsDetails,
									dob: value.toLocaleDateString(),
								});
							}}
						/>
					</MuiPickersUtilsProvider>
					{/* <TextField
						type="date"
						label="Date of Birth"
						variant="standard"
						name="dob"
						value={contactsDetails.dob}
						onChange={changeHandler}
						required
					/> */}
				</Box>
			</div>
		</div>
	);
};

export default NewContact;
