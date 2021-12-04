import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/PageNotFound.module.css';

const PageNotFound = () => {
	return (
		<div className={`app ${styles.page_not_found} container-fluid `}>
			<div className={`${styles.center} mx-auto`}>
				<h1 className={styles.h1}>
					<small className="text-primary">404</small> | Page Not Found
				</h1>
				<Link to="/" className={styles.back_btn}>
					Go Back <span>&laquo;</span>
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
