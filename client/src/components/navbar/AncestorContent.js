import React from 'react';
import { withRouter } from 'react-router';
import { WButton } from 'wt-frontend';


const AncestorContents = (props) => {
    
    const moveBackToSpreadSheet = () => {
        props.clearTransactions();
        props.history.push("/Spreadsheet/" + props.data._id)
    }
    return (
        <div className = "ancestor-entry">
            {props.index !== 0 && <i className="material-icons ancestory-arrow">keyboard_arrow_right</i>}
            <WButton className="navbar-options" wType="texted" hoverAnimation="text-primary" onClick = {moveBackToSpreadSheet}>{props.data.name}</WButton>

        </div>
    )
}

export default withRouter(AncestorContents)