import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <SidebarEntry
                        list ={entry}
                        setShowDelete = {props.setShowDelete}
                        id={tempID++} key={entry._id+props.activeid} name={entry.name} _id={entry._id}
                        updateListField={props.updateListField}
                        setActiveList = {props.setActiveList}
                    />
                ))
            }
        </>
    );
};

export default SidebarList;