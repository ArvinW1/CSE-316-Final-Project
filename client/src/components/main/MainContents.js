import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import SpreadsheetHeader from './SpreadsheetHeader';

const MainContents = (props) => {
    return (
        <div className='table ' >
            <SpreadsheetHeader activeList={props.activeList} addNewSubregion = {props.addNewSubregion}/>
            <TableHeader
                // disabled={!props.activeList._id}        addItem={props.addItem}
                // undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                // canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                // setActiveList={props.setActiveList}     sort={props.sort}
            />
            <TableContents
                key={props.activeList._id}      activeList={props.activeList}
                deleteItem={props.deleteItem}   //reorderItem={props.reorderItem}
                currentRegions = {props.currentRegions} //editItem={props.editItem} 
            />
        </div>
    );
};

export default MainContents;