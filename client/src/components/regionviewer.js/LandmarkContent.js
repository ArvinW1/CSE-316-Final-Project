import React, { useState } from 'react';
import { WCol, WRow, WButton, WInput } from 'wt-frontend';

const LandmarkContent = (props) => {

    let editable = props.data.location === props.activeList.name

    const [editingName, toggleEditName] = useState(false);

    const handleNameChange = (e) => {
        toggleEditName(false)
        if (e.target.value !== props.data.name) {
            props.editLandmark(props.data._id, e.target.value, props.data.name)
        }
    }
    return (
        <WRow >
            <WCol size="1">{
                editable && <WButton className={"subregion-button"}>
                    <i className="material-icons" onClick={() => props.setShowDelete(props.data._id)}>delete</i>
                </WButton>
            }
            </WCol>
            <WCol size="5">
                {editingName && editable ?
                    <WInput
                        className='table-input' onBlur={handleNameChange}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleNameChange(e) }}
                        autoFocus={true} type='text'
                        inputClass="table-input-class" defaultValue={props.data.name}
                    /> :
                    <div className={ editable ? 'landmark-content' : 'landmark-content-disabled'} onClick={() => toggleEditName(!editingName)}>
                        {props.data.name}
                    </div>}
            </WCol>
            <WCol size="1">
                <div className={ editable ? 'landmark-information' : 'landmark-content-disabled'}>
                    -
                </div>
            </WCol>
            <WCol size="5">
                <div className={ editable ? 'landmark-information' : 'landmark-content-disabled'}>
                    {props.data.location}
                </div>
            </WCol>
        </WRow>
    )
}

export default LandmarkContent