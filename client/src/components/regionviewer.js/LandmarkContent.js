import React, { useState } from 'react';
import { WCol, WRow, WButton, WInput } from 'wt-frontend';

const LandmarkContent = (props) => {

    const [editingName, toggleEditName] = useState(false);

    const handleNameChange = (e) => {
        toggleEditName(false)
        if(e.target.value !== props.data.name){
            props.editLandmark(props.data._id, e.target.value, props.data.name)
        }
    }
    return (
        <WRow >
            <WCol size="1">
                <WButton className={"subregion-button"}>
                    <i className="material-icons" onClick={() => props.deleteLandmark(props.data._id)}>delete</i>
                </WButton>
            </WCol>
            <WCol size="5">
                {editingName ?
                    <WInput
                        className='table-input' onBlur={handleNameChange}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleNameChange(e) }}
                        autoFocus={true} type='text'
                        inputClass="table-input-class" defaultValue={props.data.name}
                    /> :
                    <div className={'landmark-content'} onClick = {() => toggleEditName(!editingName)}>
                        {props.data.name}
                    </div>}
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