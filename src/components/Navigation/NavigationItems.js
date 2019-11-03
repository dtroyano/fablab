import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Home</NavigationItem>
        <NavigationItem link='/'>Calendar</NavigationItem>
        <NavigationItem link='/'>Contact</NavigationItem>
    </ul>
);

export default navigationItems;
