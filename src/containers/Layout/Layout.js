import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header isAuth={this.props.isAuth} role={this.props.role} />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </Aux >
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);