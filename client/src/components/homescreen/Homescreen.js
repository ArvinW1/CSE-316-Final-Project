import Logo from '../navbar/Logo';
import Login from '../modals/Login';
import Delete from '../modals/Delete';
import MainContents from '../main/MainContents';
import CreateAccount from '../modals/CreateAccount';
import NavbarOptions from '../navbar/NavbarOptions';
import * as mutations from '../../cache/mutations';
import SidebarContents from '../sidebar/SidebarContents';
import { GET_DB_MAP } from '../../cache/queries';
import React, { useState, Component } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WButton, WCard, WCFooter } from 'wt-frontend';
import {
	UpdateListField_Transaction,
	SortItems_Transaction,
	UpdateListItems_Transaction,
	ReorderItems_Transaction,
} from '../../utils/jsTPS';
import { withRouter } from 'react-router-dom';
import UpdateAccount from '../modals/UpdateAccount';
import SidebarList from '../sidebar/SidebarList';
import world from '../../Images/HomepageWorld.png'
import HomeWorld from '../../Images/PrelogGlobal.png'
import WCContent from 'wt-frontend/build/components/wcard/WCContent';

function Homescreen(props) {

	const auth = props.user === null ? false : true;
	let todolists = [];
	let maps = [];
	let SidebarData = [];
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeList, setActiveList] = useState({});
	const [showDelete, toggleShowDelete] = useState(false);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAP)

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		// Assign todolists 
		for (let map of data.getAllMaps) {
			if(map.parent === 'Untitled'){
				maps.push(map)
			}
		}
		console.log(maps)
		for (let map of maps) {
			if (map) {
				SidebarData.push({ _id: map._id, name: map.name, subregions: map.subregions});
			}
		}
	}



	// NOTE: might not need to be async
	const reloadList = async () => {
		if (activeList._id) {
			let tempID = activeList._id;
			let list = todolists.find(list => list._id === tempID);
			setActiveList(list);
		}
	}

	const loadTodoList = (list) => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		setActiveList(list);

	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAP }],
		awaitRefetchQueries: true,
		//onCompleted: () => reloadList()
	}

	const [AddMapList] = useMutation(mutations.ADD_MAPLIST);
	const [DeleteMap] = useMutation(mutations.DELETE_MAP);
	const [UpdateMapField] = useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);


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

	const createNewMap = async () => {
		let map = {
			_id: '',
			name: 'Untitled',
			parent: 'Untitled',
			capital: 'Untitled',
			leader: 'Untitled',
			owner: props.user._id,
			landmarks: [],
			subregions: [],
			sortRule: 'name',
	 		sortDirection: -1
		}
		const { data } = await AddMapList({ variables: { map: map }, refetchQueries: [{ query: GET_DB_MAP }] });
		if (data) {
			loadTodoList(data.addMaplist);
		}
	}

	const deleteMap = async (_id) => {
		DeleteMap({variables: {_id: _id}, refetchQueries: [{query: GET_DB_MAP}] });
		setActiveList({})
	}

	const updateListField = async (_id, field, value, prev) => {
		const { data } = await UpdateMapField({ variables: { _id: _id, field: field, value: value }, refetchQueries: [{ query: GET_DB_MAP }] })

	};


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

	const setShowDelete = (list) => {
		setActiveList(list)
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
							reloadTodos={refetch} setActiveList={loadTodoList}
							user={props.user} setShowUpdate={setShowUpdate}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			{
				!auth && <WCard wLayout="content-footer" className="center"><WCContent className = {"homeMap"}><img src={HomeWorld} alt="HomeWorld" className = {"preLogGlobal"}/> </WCContent>
					<WCFooter className="centerWord">WELCOME TO THE WORLD DATA MAPPER</WCFooter>
				</WCard>
			}

			{
				auth && <WLayout wLayout="header-lside" id="centerMap">
					<WLHeader className="centerMapHeader"> Your Maps </WLHeader>
					<WLSide className="centerMapSide" > 
						<WSidebar className = "centerMapSideList"> <SidebarList listIDs={SidebarData} updateListField={updateListField} setShowDelete = {setShowDelete}></SidebarList>
						</WSidebar> </WLSide>
					<WLMain className="centerMapMain">
						<WCard wLayout="content-footer" className="box">
							<WCContent className = {"homeMap"}><img src={world} alt="world" className = {"preLogGlobal"}/> </WCContent>
							<WCFooter className="boxFooter"> <WButton color="danger" size="large" span="true" onClick={createNewMap}>Create A New Map </WButton></WCFooter>
						</WCard>
					</WLMain>
				</WLayout>
			}

			{
				showDelete && (<Delete deleteMap={deleteMap} activeid={activeList._id} setShowDelete={setShowDelete} />)
			}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch} setShowLogin={setShowLogin} />)
			}

			{
				showUpdate && (<UpdateAccount user={props.user} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
			}

		</WLayout>
	);
};

export default withRouter(Homescreen);