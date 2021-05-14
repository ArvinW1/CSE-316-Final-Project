import React, { useState } from 'react';
import { WMHeader, WMMain, WModal, WInput, WButton, WMFooter } from 'wt-frontend';

const Name = (props) => {

    const [input, setInput] = useState({});

    const handleCreate = () =>{
        props.createNewMap(input)
        props.setShowMapCreate(false)
    }

    return (
        <WModal className="create-modal" cover="true" visible ={props.showMapCreate}>
            <WMHeader className="modal-header">
                Name Map
            </WMHeader>
            <WMMain>
                <WInput className="modal-input" onBlur={(e) => setInput(e.target.value)} name='mapName' labelAnimation="up" barAnimation="solid" labelText="Map Name" wType="outlined" inputType='text' />
            </WMMain>
            
            <WMFooter>
				<WButton className="modal-button" onClick={handleCreate} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
        </WModal>
    )
}

export default Name