import React            from 'react';

const SpreadsheetHeader = (props) => { 
    let regionName = "Region Name: " + props.activeList.name;
    
    return (
        <div className = {'spreadsheetName'}> {regionName} </div>
    )
}

export default SpreadsheetHeader