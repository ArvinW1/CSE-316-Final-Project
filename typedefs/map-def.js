const { gql } = require('apollo-server');

const typeDefs = gql `
    type Map {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        parent: String!
        owner: String!
        landmarks: [Landmark]
        subregions: [String]
        sortRule: String!
		sortDirection: Int!
    }
    type Landmark{
        _id: String!
        name: String!
        location: String!
    }
    extend type Query {
		getAllMaps: [Map]
	}
    extend type Mutation {
        addSubregion(subregion: MapInput!, _id: String!, index: Int!): String
        addMaplist(map: MapInput!): Map
        deleteMap(_id: String!): Boolean
        updateMapField(_id: String!, field: String!, value: String!): String
        deleteSubregion(_id: String!, subID: String!): Boolean
    }
    input MapInput {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        parent: String!
        owner: String!
        landmarks: [LandmarkInput]
        subregions: [String]
        sortRule: String!
		sortDirection: Int!
    }
    input LandmarkInput{
        _id: String!
        name: String!
        location: String!
    }
`;
module.exports = { typeDefs: typeDefs }