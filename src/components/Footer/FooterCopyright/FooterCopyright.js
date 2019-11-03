import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FooterCopyright.module.css';

const footerCopyright = (props) => (
    <div className={classes.Copyright}>
        <span>©<span>2019</span>FabLab Nola</span>
        <Link to='/'>Lab Policies</Link>
    </div>
);

export default footerCopyright;