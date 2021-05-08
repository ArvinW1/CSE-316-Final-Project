import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../navbar/Logo';
import { WLayout, WLHeader, WNavbar, WNavItem, WLMain, WLSide, WCard, WButton, WCFooter, WInput, WCol, WRow, WCContent } from 'wt-frontend';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DB_MAP } from '../../cache/queries';
import NavbarOptions from '../navbar/NavbarOptions';
import UpdateAccount from '../modals/UpdateAccount';
import Ancestors from '../navbar/Ancestors';
import RegionviewerParent from './RegionviewerParent';
import * as mutations from '../../cache/mutations';
import { ChangeParent_Transaction } from '../../utils/jsTPS';
import RegionInput from './RegionInput';

const Regionviewer = (props) => {

    const keyCombination = (e, callback) => {
        if (e.key === 'z' && e.ctrlKey) {
            if (props.tps.hasTransactionToUndo()) {
                tpsUndo();
            }
        }
        else if (e.key === 'y' && e.ctrlKey) {
            if (props.tps.hasTransactionToRedo()) {
                tpsRedo();
            }
        }
    }
    document.onkeydown = keyCombination;

    const auth = props.user === null ? false : true;
    const [activeList, setActiveList] = useState({});
    const [showDelete, toggleShowDelete] = useState(false);
    const [showLogin, toggleShowLogin] = useState(false);
    const [showCreate, toggleShowCreate] = useState(false);
    const [showUpdate, toggleShowUpdate] = useState(false);
    const [possibleParents, setPossibleParents] = useState({});
    const [showParents, toggleShowParents] = useState(false);
    const [location, setLocation] = useState({});
    const [subSize, setSubSize] = useState({});
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    let maps = [];


    const { loading, error, data, refetch } = useQuery(GET_DB_MAP)

    if (loading) { console.log(loading, 'loading'); }
    if (error) { console.log(error, 'error'); }
    if (data) {
        // Assign todolists 
        for (let map of data.getAllMaps) {
            maps.push(map)
        }
        if (!activeList._id) {
            const currentList = maps.find(map => map._id === props.match.params._id)
            setActiveList(currentList)
            let tempId = currentList.parent;
            let parent = maps.find(map => map._id === tempId);
            let parentSub = parent.subregions;
            setLocation(parentSub.indexOf(currentList._id))
            setSubSize(parentSub.length)
        }
    }

    const reloadList = async () => {
        if (activeList._id) {
            let tempID = props.match.params._id;
            let map = maps.find(map => map._id === tempID);
            setActiveList(map);
            let tempId = map.parent;
            let parent = maps.find(map => map._id === tempId);
            let parentSub = parent.subregions;
            setLocation(parentSub.indexOf(map._id))
            setSubSize(parentSub.length)
        }
    }
    const mutationOptions = {
        refetchQueries: [{ query: GET_DB_MAP }],
        awaitRefetchQueries: true,
        onCompleted: () => reloadList()
    }

    const [ChangeParent] = useMutation(mutations.CHANGE_PARENT, mutationOptions)

    const changeParent = async (newParentId) => {
        let transaction = new ChangeParent_Transaction(activeList.parent, activeList._id, newParentId, ChangeParent)
        props.tps.addTransaction(transaction)
        tpsRedo();
    }

    const navigateToSpreadsheet = () => {
        props.history.push("/Spreadsheet/" + parentRegion._id)
    }

    const loadMap = (list) => {
        props.tps.clearAllTransactions();
        setActiveList(list);
    }

    const tpsUndo = async () => {
        const ret = await props.tps.undoTransaction();
        if (ret) {
            setCanUndo(props.tps.hasTransactionToUndo());
            setCanRedo(props.tps.hasTransactionToRedo());
        }
    }

    const tpsRedo = async () => {
        const ret = await props.tps.doTransaction();
        if (ret) {
            setCanUndo(props.tps.hasTransactionToUndo());
            setCanRedo(props.tps.hasTransactionToRedo());
        }
    }

    const clearTps = async () => {
        const ret = props.tps.clearAllTransactions();
        if (ret) {
            setCanUndo(false);
            setCanRedo(false);
        }
    }

    const clickDisabled = () => { };

    const undoOptions = {
        className: !canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !canUndo ? clickDisabled : tpsUndo,
        wType: "texted",
        clickAnimation: !canUndo ? "" : "ripple-light",
        shape: "rounded"
    }

    const redoOptions = {
        className: !canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !canRedo ? clickDisabled : tpsRedo,
        wType: "texted",
        clickAnimation: !canRedo ? "" : "ripple-light",
        shape: "rounded"
    }

    const setShowLogin = () => {
        toggleShowDelete(false);
        toggleShowCreate(false);
        toggleShowUpdate(false);
        toggleShowLogin(!showLogin);
    };

    const setShowCreate = () => {
        toggleShowDelete(false);
        toggleShowLogin(false);
        toggleShowUpdate(false);
        toggleShowCreate(!showCreate);
    };

    const setShowDelete = () => {
        toggleShowCreate(false);
        toggleShowLogin(false);
        toggleShowUpdate(false);
        toggleShowDelete(!showDelete)
    };

    const setShowUpdate = () => {
        toggleShowCreate(false);
        toggleShowLogin(false);
        toggleShowDelete(false);
        toggleShowUpdate(!showUpdate)
    };

    const activeListLength = activeList._id ? activeList.subregions.length : 0;
    const parentRegion = activeList._id ? maps.find(map => map._id === activeList.parent) : "No Parent Region";

    const setParents = async () => {
        let allParents = [];
        allParents.push(parentRegion);
        let currentParent = parentRegion.parent;
        while (currentParent !== 'Untitled') {
            let tempParent = maps.find(map => map._id === currentParent)
            for (let id of tempParent.subregions) {
                if (id !== parentRegion._id) {
                    let temp = maps.find(map => map._id === id);
                    allParents.push(temp);
                }
            }
            allParents.push(tempParent);
            currentParent = tempParent.parent;
        }
        setPossibleParents(allParents);
        console.log(allParents);
    }

    const showOptions = () => {
        setParents();
        toggleShowParents(true);
    }

    const moveForward = () => {
        console.log(location)
        if (location !== (subSize - 1)) {
            props.history.push("/Regionviewer/" + parentRegion.subregions[location + 1]);
            props.tps.clearAllTransactions();
        }
    }

    const moveBack = () => {
        if (location !== 0) {
            props.history.push("/Regionviewer/" + parentRegion.subregions[location - 1]);
            props.tps.clearAllTransactions();
        }
    }

    return (

        <WLayout wLayout="header-lside" className="regionviewer-columns">
            <WLHeader>
                <WNavbar color="colored">
                    <ul>
                        <WNavItem>
                            <Logo className='logo' clearTransactions={clearTps} />
                        </WNavItem>
                    </ul>

                    <ul className="ancestor">
                        {activeList && data && <Ancestors maps={maps} clearTransactions={clearTps} />}
                    </ul>

                    <ul><WNavItem>
                        <WButton className={"subregion-button"}>
                            <i className="material-icons" onClick={moveBack}>arrow_back</i>
                            <i className="material-icons" onClick={moveForward}>arrow_forward</i>
                        </WButton>
                    </WNavItem></ul>

                    <ul>
                        <NavbarOptions
                            fetchUser={props.fetchUser} auth={auth}
                            setShowCreate={setShowCreate} setShowLogin={setShowLogin}
                            user={props.user} setShowUpdate={setShowUpdate} setActiveList={loadMap}
                        />
                    </ul>
                </WNavbar>
            </WLHeader>

            <WLSide className="regionviewer-lside">
                <WButton className={"subregion-button"} {...undoOptions}> <i className="material-icons" onClick={tpsUndo}>undo</i></WButton>
                <WButton className={"subregion-button"} {...redoOptions}> <i className="material-icons" onClick={tpsRedo}>redo</i></WButton>
                <WCard> image.png</WCard>
                <div className="regionviewer-information">
                    {"Region Name: " + activeList.name}
                </div>

                <div className="regionviewer-information">
                    <span> Parent Region: </span>
                    {showParents ?
                        <span>
                            <RegionviewerParent possibleParents={possibleParents} toggleShowParents={toggleShowParents}
                                changeParent={changeParent} activeList={activeList} parentRegion={parentRegion} />
                        </span> :
                        <span onClick={navigateToSpreadsheet} className="regionviewer-parent">
                            {parentRegion.name}
                        </span>
                    }
                    <span> <WButton className={"subregion-button"}> <i className="material-icons" onClick={showOptions}>edit</i></WButton> </span>
                </div>

                <div className="regionviewer-information">
                    {"Region Capital: " + activeList.capital}
                </div>

                <div className="regionviewer-information">
                    {"Region Leader: " + activeList.leader}
                </div>

                <div className="regionviewer-information">
                    {"# of Sub Regions: " + activeListLength}
                </div>

            </WLSide>

            <WLMain>
                <div className="landmark-header"> Region Landmarks: </div>
                <WCard className="landmark-table" wLayout="content-footer">
                    <WCContent>

                    </WCContent>
                    <WCFooter className="landmark-table-footer">
                        <RegionInput/>
                    </WCFooter>
                </WCard>

            </WLMain>

            {
                showUpdate && (<UpdateAccount user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
            }

        </WLayout>
    )
}

export default withRouter(Regionviewer)