import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Logo.module.css';
import Logo from '../../assets/fablabLogo.jpg';

const logo = (props) => (
    <Link to='/'>
        <img alt="Fab Lab" className={classes.Logo} src={Logo} />
    </Link>
);

export default logo;
