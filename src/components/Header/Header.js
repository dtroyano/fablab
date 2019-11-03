import React from 'react';

import NavigationItems from '../Navigation/NavigationItems';
import BookButtons from '../Navigation/BookButtons/BookButtons';
import Logo from '../Logo/Logo';

import classes from './Header.module.css';

const header = (props) => (
    <header className={classes.Header}>
        <Logo />
        <NavigationItems />
        <BookButtons />
    </header >
);

export default header;