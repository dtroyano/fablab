import React from 'react';
import classes from './Footer.module.css';

import FooterNavigation from './FooterNavigation/FooterNavigation';
import FooterDescription from './FooterDescription/FooterDescription';
import FooterMap from './FooterMap/FooterMap';
import FooterCopyright from './FooterCopyright/FooterCopyright';

const footer = (props) => (
    <div className={classes.FooterBackground}>
        <footer className={classes.Footer}>
            <div className={classes.FooterInfo}>
                <FooterNavigation />
                <FooterDescription />
                <FooterMap />
            </div>
            <FooterCopyright />
        </footer>
    </div>
);

export default footer;