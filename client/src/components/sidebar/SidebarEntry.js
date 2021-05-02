import React, { useState } from 'react';
import { WNavItem, WInput } from 'wt-frontend';
import { withRouter } from 'react-router-dom';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import WCol from 'wt-frontend/build/components/wgrid/WCol';

const SidebarEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props._id, name, value, preEdit);
    };

    const showSubregion = () =>{
        props.history.push("/Spreadsheet/" + props._id);
    }


    return (
        <>
            <WRow>
                <WCol size="10">
                    <WNavItem
                        className={"list-item"}
                    >
                        {
                            editing ? <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                onKeyDown={(e) => { if (e.keyCode === 13) handleSubmit(e) }}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name}
                            />
                                : <div className='list-text' onClick={showSubregion}>
                                    {props.name}
                                </div>
                        }
                    </WNavItem>
                </WCol>
                <WCol size="1">
                    <WNavItem >
                        <WButton className = "mapIcon" onClick = {handleEditing}> <i className="material-icons">edit</i></WButton>
                    </WNavItem>
                </WCol>
                <WCol size="1">
                    <WNavItem >
                        <WButton className = "mapIcon" onClick = {() => props.setShowDelete(props.list)}> <i className="material-icons">delete</i></WButton>
                    </WNavItem>
                </WCol>
            </WRow>
        </>
    );
};

export default withRouter(SidebarEntry);