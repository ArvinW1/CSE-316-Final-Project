const byName = (items, direction) => {
	if(direction === 1) items.sort((a,b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
	else items.sort((a,b) => a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1);
	return items;
}

const byCapital = (items, direction) => {
	if(direction === 1) items.sort((a,b) => a.capital.toUpperCase() > b.capital.toUpperCase() ? 1 : -1);
	else items.sort((a,b) => a.capital.toUpperCase() < b.capital.toUpperCase() ? 1 : -1);
	return items;

}

const byLeader = (items, direction) => {
	if(direction === 1) items.sort((a,b) => a.leader.toUpperCase() > b.leader.toUpperCase() ? 1 : -1);
	else items.sort((a,b) => a.leader < b.leader.toUpperCase() ? 1 : -1);
	return items;
	
}

module.exports = {byName, byCapital, byLeader}
