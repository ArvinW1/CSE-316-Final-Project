import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { WLayout, WLHeader, WNavbar, WNavItem  } from 'wt-frontend';
import NavbarOptions from '../navbar/NavbarOptions';
import UpdateAccount from '../modals/UpdateAccount';
import Logo from '../navbar/Logo';
import { useMutation, useQuery } from '@apollo/client';
import { GET_DB_MAP } from '../../cache/queries';
import WLMain from 'wt-frontend/build/components/wmodal/WMMain';
import MainContents from '../main/MainContents';
import * as mutations from '../../cache/mutations';
import { UpdateListItems_Transaction } from '../../utils/jsTPS';

function Spreadsheet(props) {
	const [showDelete, toggleShowDelete] = useState(false);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [activeList, setActiveList] = useState({});
	const [currentRegions, SetCurrentRegions] = useState({});

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
			console.log(props.match.params._id)
			const currentList = maps.find(map => map._id === props.match.params._id)
			console.log("reload")
			setActiveList(currentList)
			if(currentList.subregions){
				let currentsub = []
				for(let sub of currentList.subregions){
					let children = maps.find(map => map._id === sub)
					currentsub.push(children)
				}
				SetCurrentRegions(currentsub)
			}
		}
	}
	 //See if it is subregion by checking if currentlist is null/undefined
	
	const auth = props.user === null ? false : true;

	const reloadList = async () => {
		if (activeList._id) {
			let tempID = props.match.params._id;
			let map = maps.find(map => map._id === tempID);
			setActiveList(map);
			console.log(map)
			if(map.subregions){
				let currentsub = []
				for(let sub of map.subregions){
					let children = maps.find(map => map._id === sub)
					currentsub.push(children)
				}
				SetCurrentRegions(currentsub)
			}
		}
	}
	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAP }],
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	const [AddSubregion] = useMutation(mutations.ADD_SUBREGION, mutationOptions)

	const addSubregion = async () => {
		let map = activeList;
		let newSub = {
			_id: '',
			name: 'Not Named',
			parent: activeList._id,
			capital: 'No Capital',
			leader: 'No Leader',
			owner: props.user._id,
			landmarks: [],
			subregions: [],
		}
		const {data} = AddSubregion({variables: {_id: map._id, subregion: newSub, index: -1}})
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

			<WLMain> <MainContents activeList = {activeList} addNewSubregion = {addSubregion} currentRegions = {currentRegions} reloadList = {reloadList}/> </WLMain>

			{
				showUpdate && (<UpdateAccount user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
			}

		</WLayout>
	)

}
export default withRouter(Spreadsheet);