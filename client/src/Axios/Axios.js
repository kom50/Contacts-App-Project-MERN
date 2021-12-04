import axios from 'axios';

export default axios.create({
	baseURL: 'api/',
	'Content-Type': 'application/json',
});
