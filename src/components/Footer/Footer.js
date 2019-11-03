import React from 'react';
import classes from './Footer.module.css';

import FooterNavigation from './FooterNavigation/FooterNavigation';

const footer = (props) => (
    <footer className={classes.Footer}>
        <FooterNavigation />
        <div class="container">
            <div class="row">

                <div class="col-md-6 col-lg-4 col-6">
                    <div class="contact-container">
                        <p> Delgado Community College
                            <br /> Building 22, Room 140
                            <br />615 City Park Ave
                            <br />New Orleans, Louisana 70119
                        </p>
                        <p>
                            E:
                            <a href="mailto:ebuehl@dcc.edu">ebuehl@dcc.edu</a>
                            <br /> P: (504) 517 5656
                        </p>
                        <p>
                            Feel free to contact us with any questions about the lab, equipment, classes, or events we offer.
                        </p>
                        <p>
                            We are open to the public most weekdays,
                            <a href="calendar">check our calendar</a>
                            before dropping by.</p>
                    </div>                                </div>
                <div class="col-md-6 col-lg-4 col-6">
                    <div class="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.7162940619087!2d-90.10693958510312!3d29.987582381903067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620af705a2bdbf9%3A0xa5648eb17d6d53c!2sFAB+LAB+NOLA+%40+DCC!5e0!3m2!1sen!2sus!4v1562354700052!5m2!1sen!2sus" ></iframe>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <span class="type--fine-print">©
                <span class="update-year">2019</span>FabLab Nola</span>
                    <a class="type--fine-print" href="#">Lab Policies</a>
                </div>
            </div>
        </div>
    </footer>
);

export default footer;