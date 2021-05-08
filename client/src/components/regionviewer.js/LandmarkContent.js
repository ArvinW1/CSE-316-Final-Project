import React, { useState } from 'react';
import { WCol, WRow, WButton } from 'wt-frontend';

const LandmarkContent = (props) => {
    return (
        <WRow >
            <WCol size="1">
                <WButton className={"subregion-button"}>
                    <i className="material-icons" onClick = {() => props.deleteLandmark(props.data._id)}>delete</i>
                </WButton></WCol>
            <WCol size="5">
                <div className={'landmark-content'}>
                    {props.data.name}
                </div>
            </WCol>
            <WCol size="1">
                <div className={'landmark-content'}>
                     -
                </div>
            </WCol>
            <WCol size="5">
                <div className={'landmark-content'}>
                    {props.data.location}
                </div>
            </WCol>
        </WRow>
    )
}

export default LandmarkContent