import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../navbar/Logo';
import { WLayout, WLHeader, WNavbar, WNavItem, WLMain, WLSide, WCard, WButton, WCFooter, WInput, WCol, WRow, WCContent } from 'wt-frontend';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DB_MAP } from '../../cache/queries';
import NavbarOptions from '../navbar/NavbarOptions';
import UpdateAccount from '../modals/UpdateAccount';

const Regionviewer = (props) => {
    const auth = props.user === null ? false : true;
    const [activeList, setActiveList] = useState({});
    const [showDelete, toggleShowDelete] = useState(false);
    const [showLogin, toggleShowLogin] = useState(false);
    const [showCreate, toggleShowCreate] = useState(false);
    const [showUpdate, toggleShowUpdate] = useState(false);

    let maps = [];
    let currentPath = props.location.pathname.split("/");
	let currentPathLength = currentPath.length-1;


    const { loading, error, data, refetch } = useQuery(GET_DB_MAP)

    if (loading) { console.log(loading, 'loading'); }
    if (error) { console.log(error, 'error'); }
    if (data) {
        // Assign todolists 
        for (let map of data.getAllMaps) {
            maps.push(map)
        }
        if (!activeList._id) {
            const currentList = maps.find(map => map._id === currentPath[currentPathLength])
            setActiveList(currentList)
        }
    }

    const loadMap = (list) => {
        props.tps.clearAllTransactions();
        setActiveList(list);
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
    }

    const activeListLength = activeList._id ? activeList.subregions.length : 0;
    const parentRegion = activeList._id ? maps.find(map => map._id === activeList.parent) : "No Parent Region";

    return (

        <WLayout wLayout="header-lside" className="regionviewer-columns">
            <WLHeader>
                <WNavbar color="colored">
                    <ul>
                        <WNavItem>
                            <Logo className='logo' />
                        </WNavItem>
                    </ul>
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
                <WButton className={"subregion-button"}> <i className="material-icons">undo</i></WButton>
                <WButton className={"subregion-button"}> <i className="material-icons">redo</i></WButton>
                <WCard> image.png</WCard>
                <div className="regionviewer-information">
                    {"Region Name: " + activeList.name}
                </div>

                <div className="regionviewer-information">
                    <span> Parent Region: </span>
                    <span onClick={() => props.history.push("/Spreadsheet/" + parentRegion._id)}> {parentRegion.name} </span>
                </div>

                <div className="regionviewer-information">
                    {"Region Capital: " + activeList.name}
                </div>

                <div className="regionviewer-information">
                    {"Region Leader: " + activeList.name}
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
                    <WCFooter className = "landmark-table-footer">
                        <WRow>
                            <WCol size = "1">
                                <WButton className={"subregion-button"}> <i className="material-icons">add</i></WButton>
                            </WCol>
                            <WCol size = "11">
                            <WInput className = "landmark-table-input">

                            </WInput>
                            </WCol>
                        </WRow>
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