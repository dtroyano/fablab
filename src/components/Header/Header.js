import React from 'react';
import { Link } from 'react-router-dom';

import NavigationItems from '../Navigation/NavigationItems';

import classes from './Header.module.css';
import Logo from '../../assets/fablabLogo.jpg';

const header = (props) => (
    <header>
        <div class="nav-container">
            <nav id="menu1" class="bar bar-1">
                <div class="container">
                    <div class="row">
                        <div id="images">
                            <Link to='/'>
                                <img alt="Fab Lab" className={classes.Logo} src={Logo} />
                            </Link>
                            <NavigationItems />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header >
);

export default header;