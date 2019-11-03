import React from 'react';

import BookButton from './BookButton/BookButton';

import classes from './BookButtons.module.css';

const bookButtons = (props) => (
    <ul className={classes.BookButtons}>
        <BookButton link='/equipment'>Book Equipment</BookButton>
        <BookButton link='/class'>Book Class</BookButton>
    </ul>
);

export default bookButtons;