import React from 'react';
import AncestorContents from './AncestorContent';
import { withRouter } from 'react-router-dom';

const Ancestors = (props) => {
    let entriesIds = [];
    let entries = [];
    for (var i = 2; i < props.currentPathLength; i++) {
        entriesIds.push(props.currentPath[i]);
    }
    console.log(entriesIds)
    console.log(props.maps)
    for (let id of entriesIds) {
        let ancestor = props.maps.find(map => map._id === id);
        entries.push(ancestor);
    }
    console.log(entries)

    return (
        <div className="ancestor">
            {entries.map((entry, index) => <AncestorContents data={entry} index={index} key={entry._id} entries = {entriesIds}/>)}
        </div>)
}

export default withRouter(Ancestors)