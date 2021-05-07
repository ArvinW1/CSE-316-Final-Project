import React, { useState } from 'react';

const RegionviewerParent = (props) => {
    let entries = props.possibleParents;

    const handleParentEdit = (e) =>{
        console.log(e.target.value)
        props.toggleShowParents(false)
        if(e.target.value !== props.activeList.parent){
            props.changeParent(e.target.value)
        }
    }

    return(
        entries !== undefined ? <select className='table-select' autoFocus = {true} onBlur = {handleParentEdit}>
            {
                entries.map(entry => (
                    <option value = {entry._id} key = {entry._id}> {entry.name}</option>
                ))
            }
        </select>:
        <span></span>
    )
}

export default RegionviewerParent