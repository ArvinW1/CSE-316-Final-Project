import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;


    const name = data.name;
    const capital = data.capital;
    const leader = data.leader
    let temp = data.landmarks.map(landmark => landmark.name + " ")
    const landmarks = data.landmarks.length === 0 ? "No Landmarks" : temp;
    let timer = null;
    let trigger = false;

    function importAll(flags){
        let images = []
        flags.keys().map((item, index) => {images.push(item.replace('./', '')); })
        return images
    }

    const images = importAll(require.context('../../The World', false, /\.(png|jpe?g|svg)$/));
    
    const containsFlag = images.includes(name + " Flag.png")

    const handleNameEdit = (e) => {
        props.toggleName(false);
        const newName = e.target.value ? e.target.value : "Not Named";
        const prevName = name;
        if (newName !== prevName) {
            props.editMap(data._id, 'name', newName, prevName);
        }

    };

    const handleCapitalEdit = (e) => {
            props.toggleCapital(false);
            const newCap = e.target.value ? e.target.value : "No Capital";
            const prevCap = capital;
            if (newCap !== prevCap) {
                props.editMap(data._id, 'capital', newCap, prevCap);
            }
    };

    const handleLeaderEdit = (e) => {
            props.toggleLeader(false);
            const newLeader = e.target.value ? e.target.value : "No Leader";
            const prevLeader = leader;
            if (newLeader !== prevLeader) {
                props.editMap(data._id, 'leader', newLeader, prevLeader);
            }
    };


    const MoveToNewSub = () => {
        trigger = true;
        timer = setTimeout(() => {
            if (trigger){
                props.history.push("/Spreadsheet/" + data._id)
                props.clearTransactions();
            }
        }, 200);
    }

    const doubleClick = () =>{
        clearTimeout(timer);
        trigger = false;
        props.setShowNameInput(props.index)
    }

    const navigateToViewer = () => {
        props.history.push("/Regionviewer/" + data._id)
        props.clearTransactions();
    }

    return (
        <WRow className='table-entry'>
            <WCol size="1">
                <WButton className={"subregion-button"}> <i className="material-icons" onClick = {() => props.setShowDelete(data._id, props.index)}>delete</i></WButton>
            </WCol>
            <WCol size="3">
                {
                    props.showNameInput && props.show
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleNameEdit(e) }}
                            autoFocus={true} type='text'
                            inputClass="table-input-class" defaultValue = {name}
                        />
                        : <div className="table-text" onClick={(MoveToNewSub)} onDoubleClick = {doubleClick}>
                            {name}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    props.showCapitalInput && props.show ? <WInput
                        className='table-input' onBlur={handleCapitalEdit}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleCapitalEdit(e) }}
                        autoFocus={true} type='text'
                        inputclass="table-input-class" defaultValue = {capital}
                    />
                        : <div className="table-text" onClick = {() => props.setShowCapitalInput(props.index)}>
                            {capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    props.showLeaderInput && props.show  ? <WInput
                        className='table-input' onBlur={handleLeaderEdit}
                        onKeyDown={(e) => { if (e.keyCode === 13) handleLeaderEdit(e) }}
                        autoFocus={true} type='text'
                        inputclass="table-input-class" defaultValue = {leader}
                    >
                    </WInput>
                        : <div className={`table-text`} onClick = {() => props.setShowLeaderInput(props.index)}>
                            {leader}
                        </div>
                }
            </WCol>

            <WCol size="1">
                {
                    containsFlag ? <img src = {require('../../The World/' + name + " Flag.png")} className = "image-size"></img> : 
                    <img src = {require('../../The World/No Flag.png')} className = "image-size"></img>
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