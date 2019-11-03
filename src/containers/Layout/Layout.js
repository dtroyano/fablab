import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </Aux >
        );
    }
}

export default Layout;