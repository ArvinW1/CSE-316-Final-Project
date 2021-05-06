import React from 'react';
import { WNavItem, WButton, WCol } from 'wt-frontend';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const SpreadsheetHeader = (props) => {
    let regionName = "Region Name: " + props.activeList.name;
    const clickDisabled = () => { };

    const undoOptions = {
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <>
            <WRow>
                <WCol size={"1"}></WCol>
                <WCol size={"4"}>
                    <WButton onClick = {props.addNewSubregion} className = {"subregion-button"}> 
                    <i className="material-icons">add</i>
                    </WButton>
                    <WButton className = {"subregion-button"} {...undoOptions} > <i className="material-icons">undo</i></WButton>
                    <WButton className = {"subregion-button"} {...redoOptions}> <i className="material-icons">redo</i></WButton>
                </WCol>
                <WCol size={"7"}>
                    <div className={'spreadsheetName'}> {regionName} </div>
                </WCol>
            </WRow>
        </>
    )
}

export default SpreadsheetHeader