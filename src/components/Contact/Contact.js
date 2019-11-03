import React from 'react';

import classes from './Contact.module.css';

const contact = (props) => (
    <div className={classes.Container}>
        <h1>Contact Us</h1>
        <h2>Lab phone number - 504-617-5656</h2>
        <div>
            <p>
                Lab Manager - Ellie Buehler <br />
                Phone number - 504-517-2629 <br />
                Email - ebuehl@dcc.edu <br />
            </p>
            <p>
                Educational Coordinator - Zach Chauvin <br />
                Email - zchauv@dcc.edu
            </p>
            <p>
                Community Coordinator - Joe Cantu <br />
                Email - jcantu@dcc.edu
            </p>
        </div>
    </div>
);

export default contact;