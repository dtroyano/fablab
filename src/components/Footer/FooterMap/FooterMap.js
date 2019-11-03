import React from 'react';

import classes from './FooterMap.module.css';

const footerMap = (props) => (
    <div className={classes.MapContainer}>
        <iframe className={classes.Map} title="FabLabMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.7162940619087!2d-90.10693958510312!3d29.987582381903067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620af705a2bdbf9%3A0xa5648eb17d6d53c!2sFAB+LAB+NOLA+%40+DCC!5e0!3m2!1sen!2sus!4v1562354700052!5m2!1sen!2sus" ></iframe>
    </div>
);

export default footerMap;