const { gql } = require('apollo-server');

const typeDefs = gql `
    type Map {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        parent: String!
        owner: String!
        landmarks: [String!]
        subregions: [String!]
    }
    extend type Query {
		getAllMaps: [Map]
	}
    extend type Mutation {
        addSubregion(subregion: MapInput!, _id: String!, index: Int!): String
        addMaplist(map: MapInput!): Map
        deleteMap(_id: String!): Boolean
        updateMapField(_id: String!, field: String!, value: String!): String
    }
    input MapInput {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        parent: String!
        owner: String!
        landmarks: [String!]
        subregions: [String!]
    }
`;
module.exports = { typeDefs: typeDefs }