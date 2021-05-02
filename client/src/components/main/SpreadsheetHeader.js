import React from 'react';
import { WNavItem, WButton, WCol } from 'wt-frontend';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const SpreadsheetHeader = (props) => {
    let regionName = "Region Name: " + props.activeList.name;

    return (
        <>
            <WRow>
                <WCol size={"1"}></WCol>
                <WCol size={"4"}>
                    <WButton onClick = {props.addNewSubregion} className = {"subregion-button"}> 
                    <i className="material-icons">add</i>
                    </WButton>
                    <WButton className = {"subregion-button"}> <i className="material-icons">undo</i></WButton>
                    <WButton className = {"subregion-button"}> <i className="material-icons">redo</i></WButton>
                </WCol>
                <WCol size={"7"}>
                    <div className={'spreadsheetName'}> {regionName} </div>
                </WCol>
            </WRow>
        </>
    )
}

export default SpreadsheetHeader