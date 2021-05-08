import React, { useState } from 'react';
import { WButton,WInput, WCol, WRow } from 'wt-frontend';

const RegionInput = (props) => {

    const [input, setInput] = useState({});

    const handleAddLandmark = () =>{
        props.createNewLandmark(input)
    }

    return (
        <WRow>
            <WCol size="1">
                <WButton className={"subregion-button"} onClick = {handleAddLandmark} > <i className="material-icons">add</i></WButton>
            </WCol>
            <WCol size="11">
                <WInput className="landmark-table-input" onBlur = {(e) => setInput(e.target.value)}>

                </WInput>
            </WCol>
        </WRow>
    )
}

export default RegionInput;