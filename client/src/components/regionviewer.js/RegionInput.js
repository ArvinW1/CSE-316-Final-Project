import React, { useState } from 'react';
import { WButton,WInput, WCol, WRow } from 'wt-frontend';

const RegionInput = (props) => {
    return (
        <WRow>
            <WCol size="1">
                <WButton className={"subregion-button"}> <i className="material-icons">add</i></WButton>
            </WCol>
            <WCol size="11">
                <WInput className="landmark-table-input">

                </WInput>
            </WCol>
        </WRow>
    )
}

export default RegionInput;