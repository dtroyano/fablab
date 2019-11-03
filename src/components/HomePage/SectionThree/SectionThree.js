import React from 'react';

import classes from './SectionThree.module.css';
import Image from '../../../assets/fabLabFQFest.jpg';

const sectionThree = (props) => (
    <div className={classes.Container}>
        <div className={classes.Image}>
            <img src={Image} alt="French Quarter Fest" />
            <p>Dinah L. Rogers, NOLA.com</p>
        </div>
        <div className={classes.Text}>
            <h2>The FabLab is for everyone.</h2>
            <p class="lead">
                All ages welcome. We are available for field trips.
                            </p>
            <a href="contact">Contact Us</a>
        </div>
    </div>
);

export default sectionThree;