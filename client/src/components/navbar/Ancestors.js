import React from 'react';
import AncestorContents from './AncestorContent';
import { withRouter } from 'react-router-dom';

const Ancestors = (props) => {
    let currentList = props.maps.find(map => map._id === props.match.params._id)
    let entries = [];

    while(currentList.parent !== 'Untitled'){
        let ancestor = props.maps.find(map => map._id === currentList.parent);
        currentList= ancestor
        entries.push(ancestor);
    }
    entries.reverse();
    console.log(entries)

    return (
        <div className="ancestor">
            {entries.map((entry, index) => <AncestorContents data={entry} index={index} key={entry._id}/>)}
        </div>)
}

export default withRouter(Ancestors)