import React, { useState } 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Spreadsheet from './components/subregion/Spreadsheet';
 
const App = () => {
	const [activeList, setActiveList] = useState({});
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Route 
					path="/home" 
					name="home" 
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} setActiveList = {setActiveList}/>
					} 
				/>
				<Route path = "/spreadsheet/:_id"> <Spreadsheet tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps}/>  </Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;