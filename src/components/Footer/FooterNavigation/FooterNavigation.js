import React from 'react';

import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';

import classes from './FooterNavigation.module.css';

const footerNavigation = (props) => (
    <div className={classes.FooterNavigation}>
        <h5 className={classes.FablabTitle}>FABLAB DELGADO</h5>
        <ul className={classes.FooterLinks} >
            <NavigationItem link='/'>Home</NavigationItem>
            <NavigationItem link='/'>Blog</NavigationItem>
            <NavigationItem link='/'>Calendar</NavigationItem>
            <NavigationItem link='/'>Contact</NavigationItem>
            <NavigationItem link='/'>About</NavigationItem>
        </ul>
    </div>
);

export default footerNavigation;