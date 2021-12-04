import * as React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
	Divider,
	IconButton,
} from '@mui/material';
import { MdClose } from 'react-icons/md';

const Dialog2 = ({ data, isOpen, handleClose }) => {
	console.log('dialog data ', data);
	let arr = [];
	let keys = [
		'First Name ',
		'Last Name',
		'Email',
		'Phone No',
		'Address',
		'Date of Birth',
	];
	for (let key in data) {
		arr.push({ value: data[key] });
	}
	console.log(arr);

	return (
		<Dialog
			classes={{}}
			fullWidth
			open={isOpen}
			onClose={handleClose}
			aria-describedby="contacts-description">
			<div className="d-flex justify-content-between">
				<DialogTitle >
					{'Contacts Details'}
				</DialogTitle>
				<IconButton
					onClick={handleClose}
					aria-label="close"
					sx={{ m: 2 }}>
					<MdClose />
				</IconButton>
			</div>
			<Divider />
			<DialogContent>
				<DialogContentText >
					{arr.map((data, index) => {
						return (
							<Typography
								gutterBottom
								variant="subtitle1"
								component="div"
								key={
									index
								}>{`${keys[index]} : ${data.value}`}</Typography>
						);
					})}
					
				</DialogContentText>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Dialog2;
