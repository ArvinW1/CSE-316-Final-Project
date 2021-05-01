import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

// export const GET_DB_TODOS = gql`
// 	query GetDBTodos {
// 		getAllTodos {
// 			_id
// 			name
// 			owner
// 			items {
// 				_id
// 				description
// 				due_date
// 				assigned_to
// 				completed
// 			}
// 			sortRule
// 			sortDirection
// 		}
// 	}
// `;

export const GET_DB_MAP = gql`
	query GetDBMaps {
		getAllMaps {
			_id
			name
			capital
        	leader
        	parent
			owner
			landmarks{
				_id
				name
				location
			}
			subregions
		}
	}
`;