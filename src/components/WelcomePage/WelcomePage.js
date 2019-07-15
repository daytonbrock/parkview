import React, { Component } from 'react';
import { connect } from 'react-redux';

import './WelcomePage.css';

class WelcomePage extends Component {

    render() {
        return (
            <div className="welcome-container">
                
            </div>
        );
    }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(WelcomePage);