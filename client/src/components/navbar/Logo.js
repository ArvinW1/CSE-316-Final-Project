import React from 'react';
import { withRouter } from 'react-router-dom';
import { WButton, WNavItem } from 'wt-frontend';

const Logo = (props) => {
    const goHome = () => {
        if (props.location.pathname !== "/home") {
            props.history.push("/home")
            props.clearTransactions();
        }
    }
    return (
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={goHome} wType="texted" hoverAnimation="text-primary">
                The World Data Mapper
                </WButton>
        </WNavItem>
    );
};

export default withRouter(Logo);