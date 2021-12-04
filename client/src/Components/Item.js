import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Item = ({ value }) => {
	const history = useHistory();
	return (
		<>
			<Link
				to={{
					pathname: '/view_contacts',
					state: { value },
				}}
				style={{ textDecoration: 'none' }}>
				<li className={` list-group-item list-group-item-action`}>
					{value.first_name}
				</li>
			</Link>
		</>
	);
};

export default Item;
