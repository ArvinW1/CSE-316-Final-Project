import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
			initials
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;
export const UPDATE = gql`
	mutation Update($oldEmail: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!){
		update(oldEmail: $oldEmail, email: $email, password: $password, firstName: $firstName, lastName: $lastName){
			email
			password
			firstName
			lastName
		}
	}
`;

export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const ADD_SUBREGION = gql`
	mutation AddSubregion($subregion: MapInput!, $_id: String!, $index: Int!){
		addSubregion(subregion: $subregion, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const SORT_ITEMS = gql`
	mutation SortItems($_id: String!, $criteria: String!) {
		sortItems(_id: $_id, criteria: $criteria) {
			_id
			description
			due_date
			assigned_to
			completed
		}
	}
`;

export const SORT_MAPS = gql`
	mutation SortMaps($_id: String!, $criteria: String!, $opcode: Int!, $regionIDs:[String], $direction: Int!){
		sortMaps(_id: $_id, criteria: $criteria, opcode: $opcode, regionIDs: $regionIDs, direction: $direction)
	}
`;

export const ADD_TODOLIST = gql`
	mutation AddTodolist($todolist: TodoInput!) {
		addTodolist(todolist: $todolist) {
			_id
			name
			owner
			items {
				_id
				description
				due_date
				assigned_to
				completed
			}
			sortRule
			sortDirection
		}
	}
`;

export const ADD_MAPLIST = gql`
		mutation AddMaplist($map: MapInput!){
			addMaplist(map: $map){
				_id
				name
				owner
				capital
        		leader
        		landmarks{
					_id
					name
					location
				}
        		parent
				subregions
				sortRule
				sortDirection
			}
		}
`;
export const DELETE_MAP = gql`
		mutation DeleteMap($_id: String!){
			deleteMap(_id: $_id)
		}
`;
export const DELETE_TODOLIST = gql`
	mutation DeleteTodolist($_id: String!) {
		deleteTodolist(_id: $_id)
	}
`;
export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($_id: String!, $subID: String!){
		deleteSubregion(_id: $_id, subID: $subID)
	}
`;
export const UPDATE_TODOLIST_FIELD = gql`
	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
		updateTodolistField(_id: $_id, field: $field, value: $value)
	}
`;

export const UPDATE_MAP_FIELD = gql`
	mutation UpdateMapField($_id: String!, $field: String!, $value: String!) {
		updateMapField(_id: $_id, field: $field, value: $value)
	}
`;

export const CHANGE_PARENT = gql`
	mutation ChangeParent($parentId: String!, $regionId: String!, $newParentId: String!){
		changeParent(parentId: $parentId, regionId: $regionId, newParentId: $newParentId)
	}
`;

export const ADD_LANDMARK = gql`
	mutation AddLandmark($_id: String!, $landmark: LandmarkInput, $index: Int!){
		addLandmark(_id: $_id, landmark: $landmark, index: $index)
	}
`;

export const DELETE_LANDMARK = gql`
	mutation DeleteLandmark($_id: String!, $landmarkId: String!){
		deleteLandmark(_id: $_id, landmarkId: $landmarkId)
	}
`;

export const UPDATE_LANDMARK = gql`
	mutation UpdateLandmark($_id: String!, $landmarkId: String!, $value: String!){
		updateLandmark(_id: $_id, landmarkId: $landmarkId, value: $value){
			_id
			name
			location
		}
	}
`;