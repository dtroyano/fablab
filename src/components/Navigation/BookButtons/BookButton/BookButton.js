import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './BookButton.module.css';

const bookButton = (props) => (
    <li className={classes.BookButton}>
        <NavLink
            to={props.link}
            exact
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);


export default bookButton;