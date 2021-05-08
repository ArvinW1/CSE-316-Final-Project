import React, { useState } from 'react';
import { WCol, WRow } from 'wt-frontend';

const LandmarkContent = (props) => {
    return (
        <WRow>
            <WCol size = "4">
            <div className={'landmark-content'}>
                {props.data.name + " - " + props.data.location}
            </div>
            </WCol>
        </WRow>
    )
}

export default LandmarkContent