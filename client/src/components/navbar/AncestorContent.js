import React from 'react';
import { withRouter } from 'react-router';
import { WButton } from 'wt-frontend';


const AncestorContents = (props) => {
    
    const moveBackToSpreadSheet = () => {
        let destination = "/Spreadsheet"
        console.log(props.data._id)
        console.log(props.entries.indexOf(props.data._id))
        let i = 1;
        for(let id of props.entries){
            if (i){
                destination += "/" + id
                if(id === props.data._id){
                    i = 0
                }
            }
        }
        console.log(destination)
        props.history.push(destination)
    }
    return (
        <div className = "ancestor-entry">
            {props.index !== 0 && <i className="material-icons ancestory-arrow">keyboard_arrow_right</i>}
            <WButton className="navbar-options" wType="texted" hoverAnimation="text-primary" onClick = {moveBackToSpreadSheet}>{props.data.name}</WButton>

        </div>
    )
}

export default withRouter(AncestorContents)