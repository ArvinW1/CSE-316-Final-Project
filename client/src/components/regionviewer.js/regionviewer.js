import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../navbar/Logo';
import { WLayout, WLHeader, WNavbar, WNavItem, WLMain, WLSide, WCard } from 'wt-frontend';
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
                <WCard></WCard>
                <div>
                    {"Region Name: " + activeList.name}
                </div>

                <div>
                    <span> Parent Region: </span>
                    <span onClick = {() => props.history.push("/Spreadsheet/" + parentRegion._id)}> {parentRegion.name} </span>
                </div>

                <div>
                    {"Region Capital: " + activeList.name}
                </div>

                <div>
                    {"Region Leader: " + activeList.name}
                </div>

                <div>
                    {"# of Sub Regions: " + activeListLength}
                </div>

            </WLSide>

            <WLMain> </WLMain>

            {
                showUpdate && (<UpdateAccount user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
            }

        </WLayout>
    )
}

export default withRouter(Regionviewer)