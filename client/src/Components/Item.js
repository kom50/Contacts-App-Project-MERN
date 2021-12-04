import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Item = ({ value }) => {
	const history = useHistory();
	return (
		<>
			<Link
				to={{
					pathname: '/view_contacts',
					// search: '?sort=name',
					state: { value },
				}}
				style={{ textDecoration: 'none' }}>
				<li
					className={` list-group-item list-group-item-action`}
					// onClick={() => {
					// 	console.log('view');
					// 	history.push('/view_contacts', value);
					// }}
				>
					{value.first_name}
				</li>
			</Link>
		</>
	);
};

export default Item;
