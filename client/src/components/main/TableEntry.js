import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;


    const name = data.name;
    const capital = data.capital;
    const leader = data.leader
    const landmarks = data.landmarks.length === 0 ? "No Landmarks" : data.landmarks;
    let timer = null;
    let trigger = false;

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCaptial, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const disabledButton = () => { }

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : "Not Named";
        const prevName = name;
        if (newName !== prevName) {
            props.editMap(data._id, 'name', newName, prevName);
        }

    };

    const handleCapitalEdit = (e) => {
            toggleCapitalEdit(false);
            const newCap = e.target.value ? e.target.value : "No Capital";
            const prevCap = capital;
            if (newCap !== prevCap) {
                props.editMap(data._id, 'capital', newCap, prevCap);
            }
    };

    const handleLeaderEdit = (e) => {
            toggleLeaderEdit(false);
            const newLeader = e.target.value ? e.target.value : "No Leader";
            const prevLeader = leader;
            if (newLeader !== prevLeader) {
                props.editMap(data._id, 'leader', newLeader, prevLeader);
            }
    };


    const MoveToNewSub = () => {
        trigger = true;
        timer = setTimeout(() => {
            if (trigger)
                props.history.push("/Spreadsheet/" + data._id)
        }, 200);
    }

    const doubleClick = () =>{
        clearTimeout(timer);
        trigger = false;
        toggleNameEdit(true);
    }

    const navigateToViewer = () => {
        props.history.push("/Regionviewer/" + data._id)
    }

    return (
        <WRow className='table-entry'>
            <WCol size="1">
                <WButton className={"subregion-button"}> <i className="material-icons" onClick = {() => props.setShowDelete(data._id, props.index)}>delete</i></WButton>
            </WCol>
            <WCol size="3">
                {
                    editingName
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleNameEdit(e) }}
                            autoFocus={true} type='text'
                            inputClass="table-input-class" defaultValue = {name}
                        />
                        : <div className="table-text" onClick={MoveToNewSub} onDoubleClick = {doubleClick}>
                            {name}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingCaptial ? <WInput
                        className='table-input' onBlur={handleCapitalEdit}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleCapitalEdit(e) }}
                        autoFocus={true} type='text'
                        inputclass="table-input-class" defaultValue = {capital}
                    />
                        : <div className="table-text" onClick = {() => toggleCapitalEdit(true)}>
                            {capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader ? <WInput
                        className='table-input' onBlur={handleLeaderEdit}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleLeaderEdit(e) }}
                        autoFocus={true} type='text'
                        inputclass="table-input-class" defaultValue = {leader}
                    >
                    </WInput>
                        : <div className={`table-text`} onClick = {() => toggleLeaderEdit(true)}>
                            {leader}
                        </div>
                }
            </WCol>

            <WCol size="1">
                {
                    <div className={`table-text`}>
                        { }
                    </div>
                }
            </WCol>

            <WCol size="3">
                <div className={`table-text`} onClick={navigateToViewer}>
                    {landmarks}
                </div>
            </WCol>
        </WRow>
    );
};

export default withRouter(TableEntry);