import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { WLayout, WLHeader } from 'wt-frontend';
import { WNavbar, WNavItem } from 'wt-frontend';
import NavbarOptions from '../navbar/NavbarOptions';
import UpdateAccount from '../modals/UpdateAccount';
import Logo from '../navbar/Logo';
import { useQuery } from '@apollo/client';
import { GET_DB_MAP } from '../../cache/queries';
import WLMain from 'wt-frontend/build/components/wmodal/WMMain';
import MainContents from '../main/MainContents';

function Spreadsheet(props) {
	const [showDelete, toggleShowDelete] = useState(false);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [activeList, setActiveList] = useState({})

	let maps = [];


	const { loading, error, data, refetch } = useQuery(GET_DB_MAP)

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign todolists 
		for (let map of data.getAllMaps) {
			maps.push(map)
		}
		if(!activeList._id){
			const currentList = maps.find(map => map._id === props.match.params._id)
			setActiveList(currentList)
		}
	}
	 //See if it is subregion by checking if currentlist is null/undefined
	

	const auth = props.user === null ? false : true;

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

	return (
		<WLayout wLayout="header">
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

			<WLMain> <MainContents activeList = {activeList} /> </WLMain>

			{
				showUpdate && (<UpdateAccount user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
			}

		</WLayout>
	)

}
export default withRouter(Spreadsheet);