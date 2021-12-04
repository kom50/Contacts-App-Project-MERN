import { createContext, useState, useEffect } from 'react';
import Axios from '../Axios/Axios';

export const context = createContext();

const ContextStore = (props) => {
	// for login or not
	const [isLoggedIn, setLogin] = useState(false);

	//  for current user details
	const [user, setUser] = useState({ username: '', password: '' });
	// for contacts list
	const [contacts, setAllContacts] = useState([]);

	const getAllContacts = async () => {
		const result = await Axios.get(`/contacts/?username=${user.username}`);
		console.log('get all contacts ', result);
		//
		setAllContacts(result.data);
	};

	useEffect(() => {
		console.log('store is here');
	}, []);

	return (
		<context.Provider
			value={{
				user,
				setUser,
				contacts,
				setAllContacts,
				isLoggedIn,
				setLogin,
				getAllContacts,
			}}>
			{props.children}
		</context.Provider>
	);
};

export default ContextStore;
