import React from 'react';
import {withRouter } from 'react-router-dom';
import { WButton, WNavItem } from 'wt-frontend';

const Logo = (props) => {
    const goHome = () =>{
        props.history.push("/")
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