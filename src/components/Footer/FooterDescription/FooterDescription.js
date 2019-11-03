import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FooterDescription.module.css';

const footerDescription = (props) => (
    <div className={classes.Description}>
        <p>Delgado Community College
            <br /> Building 22, Room 140
            <br />615 City Park Ave
            <br />New Orleans, Louisana 70119
        </p>
        <p>
            E: <a href="mailto:ebuehl@dcc.edu">ebuehl@dcc.edu</a>
            <br /> P: (504) 517 5656
        </p>
        <p>Feel free to contact us with any questions about the lab, equipment, classes, or events we offer.</p>
        <p>We are open to the public most weekdays, <Link to='/'>check our calendar</Link> before dropping by.</p>
    </div>
);

export default footerDescription;