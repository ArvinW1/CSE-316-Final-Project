import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;


    const name = data.name;
    const capital = data.capital;
    const leader = data.leader
    const landmarks = data.landmarks

    const [editingDate, toggleDateEdit] = useState(false);
    const [editingDescr, toggleDescrEdit] = useState(false);
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [editingAssigned, toggleAssignEdit] = useState(false);

    const disabledButton = () => { }

    const handleDateEdit = (e) => {
        // toggleDateEdit(false);
        // const newDate = e.target.value ? e.target.value : 'No Date';
        // const prevDate = due_date;
        // if (newDate !== prevDate) {
        //     props.editItem(data._id, 'due_date', newDate, prevDate);
        // }

    };

     const handleDescrEdit = (e) => {
    //     toggleDescrEdit(false);
    //     const newDescr = e.target.value ? e.target.value : 'No Description';
    //     const prevDescr = description;
    //     if (newDescr !== prevDescr) {
    //         props.editItem(data._id, 'description', newDescr, prevDescr);
    //     }
     };

     const handleStatusEdit = (e) => {
    //     toggleStatusEdit(false);
    //     const newStatus = e.target.value ? e.target.value : false;
    //     const prevStatus = status;
    //     if (newStatus !== prevStatus) {
    //         props.editItem(data._id, 'completed', newStatus, prevStatus);
    //     }
     };

    const handleAssignEdit = (e) => {
    //     toggleAssignEdit(false);
    //     const newAssigned = e.target.value ? e.target.value : 'Myself';
    //     const prevAssigned = assigned_to;
    //     if (newAssigned !== prevAssigned) {
    //         props.editItem(data._id, 'assigned_to', newAssigned, prevAssigned);
    //     }
    }
    const MoveToNewSub = () =>{
        props.history.push("/Spreadsheet/" + data._id)
    }

    return (
        <WRow className='table-entry'>
            <WCol size="4">
                {
                    editingDescr 
                        ? <WInput
                            className='table-input' onBlur={handleDescrEdit}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleDescrEdit(e) }}
                            autoFocus={true}  type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text" onClick = {MoveToNewSub}>
                            {name}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingDate ? <WInput
                        className='table-input' onBlur={handleDateEdit}
                        autoFocus={true}  type='date'
                        wtype="outlined" baranimation="solid" inputclass="table-input-class"
                    />
                        : <div className="table-text">
                            {capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingStatus ? <select
                        className='table-select' onBlur={handleStatusEdit}
                        autoFocus={true} 
                    >
                        <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                    </select>
                        : <div className={`table-text`}>
                            {leader}
                        </div>
                }
            </WCol>

            <WCol size="1">
                {
                    editingAssigned
                        ? <WInput
                            className='table-input' onBlur={handleAssignEdit}
                            onKeyDown={(e) => { if (e.keyCode === 13) handleAssignEdit(e) }}

                            autoFocus={true} type='text'
                            /*wType="outlined" barAnimation="solid" */ inputclass="table-input-class"
                        />
                        : <div className={`table-text`}>
                            {}
                        </div>
                }
            </WCol>

            <WCol size="3">
                <div className={`table-text`}>
                    {landmarks}
                </div>
            </WCol>
        </WRow>
    );
};

export default withRouter(TableEntry);