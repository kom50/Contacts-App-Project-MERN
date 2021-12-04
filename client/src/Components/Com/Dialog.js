import * as React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from '@mui/material';

const Dialog1 = ({ open, handleClose }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">
				{'Contacts Details'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<Typography gutterBottom>Name : om prakash</Typography>
					<Typography gutterBottom>Last Name : kumar</Typography>
					<Typography gutterBottom>Phone No : 989545356</Typography>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Disagree</Button>
				<Button onClick={handleClose} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Dialog1;
