import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Home</NavigationItem>
        <NavigationItem link='/blog'>Blog</NavigationItem>
        <NavigationItem link='/calendar'>Calendar</NavigationItem>
        <NavigationItem link='/contact'>Contact</NavigationItem>
        <NavigationItem link='/about'>About</NavigationItem>
    </ul>
);

export default navigationItems;
