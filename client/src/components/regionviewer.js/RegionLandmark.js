import React, { useState } from 'react';
import LandmarkContent from './LandmarkContent';

const RegionLandmark = (props) => {
    let entries = props.entries;


    return (
        entries !== undefined && entries.length > 0 && <div>
            {entries.map(entry => (
                <LandmarkContent data={entry} key={entry._id} deleteLandmark={props.deleteLandmark} editLandmark={props.editLandmark} activeList = {props.activeList} setShowDelete = {props.setShowDelete}/>
            ))}
        </div>
    )
}

export default RegionLandmark