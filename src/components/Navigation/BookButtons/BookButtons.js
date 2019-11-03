import React from 'react';

import NavigationItem from '../NavigationItem/NavigationItem';

import classes from './BookButtons.module.css';

const bookButtons = (props) => (
    <ul className={classes.navigationItems}>
        <NavigationItem link='/'>Book Equipment</NavigationItem>
        <NavigationItem link='/'>Book Class</NavigationItem>
    </ul>
);

export default bookButtons;