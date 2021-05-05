import React        from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {

    let entries = props.activeList ? props.currentRegions : null;
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index}
                        deleteItem={props.deleteItem} //reorderItem={props.reorderItem}
                        editMap={props.editMap} deleteRegion = {props.deleteRegion}
                    />
                ))
            }

            </div>
            : <div className='container-primary' >
                {
                    props.activeList._id ? <h2 className="nothing-msg"> No Subregions Currently!</h2> : <></> 
                }               
                
            </div>
    );
};

export default TableContents;