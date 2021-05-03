import React from 'react';
import TableHeader from './TableHeader';
import TableContents from './TableContents';
import SpreadsheetHeader from './SpreadsheetHeader';
import { wLayout, WLHeader, WLMain, WLSide, WButton, WCard, WCFooter, WCHeader, WCContent } from 'wt-frontend';

const MainContents = (props) => {
    return (
        <div className='table ' >
            <WCard wLayout={"header-content"} className="subregion-table">

                <WCHeader>
                    <SpreadsheetHeader activeList={props.activeList} addNewSubregion={props.addNewSubregion} />
                </WCHeader>

                <WCContent >
                    <WCard wLayout={"header-content"} className="subregion-content-table">
                        <WCHeader className = "subregion-content-header">
                            <TableHeader
                            // disabled={!props.activeList._id}        addItem={props.addItem}
                            // undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                            // canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                            // setActiveList={props.setActiveList}     sort={props.sort}
                            />
                        </WCHeader>

                        <WCContent className="subregion-content">
                            <TableContents
                                key={props.activeList._id} activeList={props.activeList}
                                deleteItem={props.deleteItem}   //reorderItem={props.reorderItem}
                                currentRegions={props.currentRegions} //editItem={props.editItem} 
                                currentPath = {props.currentPath}
                            />
                        </WCContent>

                    </WCard>
                </WCContent>
            </WCard>
        </div>
    );
};

export default MainContents;