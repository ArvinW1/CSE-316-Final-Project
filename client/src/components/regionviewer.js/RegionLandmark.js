import React, { useState } from 'react';
import LandmarkContent from './LandmarkContent';

const RegionLandmark = (props) => {
    let entries = props.activeList.landmarks;

    function traverse(subregions) {
        let tempEntries = []
        console.log(subregions)
        if (subregions) {
            for (let id of subregions) {
                let tempMap = props.maps.find(map => map._id === id)
                tempEntries = tempMap.landmarks;
                tempEntries = tempEntries.concat(traverse(tempMap.subregions))
            }
        }
        return tempEntries
    }

    if(props.activeList.subregions){
        entries = entries.concat(traverse(props.activeList.subregions))
    }

    return (
        entries !== undefined && entries.length > 0 && <div>
            {entries.map(entry => (
                <LandmarkContent data={entry} key={entry._id} deleteLandmark={props.deleteLandmark} editLandmark={props.editLandmark} activeList = {props.activeList}/>
            ))}
        </div>
    )
}

export default RegionLandmark