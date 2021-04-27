import React from 'react';
import {withRouter } from 'react-router-dom';

const Logo = (props) => {
    const goHome = () =>{
        props.history.push("/")
    }
    return (
        <div className='logo' onClick ={goHome}>
            The World Data Mapper
        </div>
    );
};

export default withRouter(Logo);