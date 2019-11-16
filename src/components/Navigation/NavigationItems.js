import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../hoc/Auxiliary';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    let role = null;
    if (props.role === 'admin') {
        role = <NavigationItem link='/staff'>Staff</NavigationItem>
    }
    if (props.role === 'employee') {
        role = <NavigationItem link='/staff'>Staff</NavigationItem>
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/'>Home</NavigationItem>
            <NavigationItem link='/blog'>Blog</NavigationItem>
            <NavigationItem link='/calendar'>Calendar</NavigationItem>
            <NavigationItem link='/contact'>Contact</NavigationItem>
            <NavigationItem link='/about'>About</NavigationItem>
            {!props.isAuth
                ? <NavigationItem link='/auth'>Sign In</NavigationItem>
                : (<Aux>
                    <NavigationItem link='/logout'>Sign Out</NavigationItem>
                    <NavigationItem link={`/${localStorage.getItem('userId')}`}>Profile</NavigationItem>
                </Aux>)
            }
            {role}
        </ul>
    );
}
export default navigationItems;
