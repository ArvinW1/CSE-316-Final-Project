import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {
    let disabled = false;

    if(props.activeList._id){
        disabled = props.activeList.subregions.length >= 2
    }

    return (
        <WRow className="table-header">
            <WCol size = "1"></WCol>

            <WCol size="3">
                <WButton className={ disabled ? 'table-header-section' : 'table-header-section-no-hover'} wType="texted" onClick = {() => props.sort('name')} >Name</WButton>
            </WCol>
            
            <WCol size="2">
                <WButton className={ disabled ? 'table-header-section' : 'table-header-section-no-hover'} wType="texted" onClick = {() => props.sort('capital')}>Capital</WButton>
            </WCol>

            <WCol size="2">
                <WButton className={ disabled ? 'table-header-section' : 'table-header-section-no-hover'} wType="texted" onClick = {() => props.sort('leader')}>Leader</WButton>
            </WCol>
            <WCol size="1">
                <WButton className={'table-header-section-no-hover'} wType="texted">Flag</WButton>
            </WCol>
            <WCol size="3">
                <WButton className={'table-header-section-no-hover'} wType="texted">Landmarks</WButton>
            </WCol>

        </WRow>
    );
};

export default TableHeader;