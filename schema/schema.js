const graphql = require('graphql')
const {
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = graphql




const Create = new GraphQLObjectType({
    name: 'CreateUser',
    fields: () => ({
        data: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        error: { type: GraphQLList(ReturnType) },
    })
})


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        city: { type: GraphQLString },
        role: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        companyId: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        dashboardId: { type: GraphQLInt },
    })
})


const GetUserType = new GraphQLObjectType({
    name: 'GetUserById',
    fields: () => ({
        data: { type: GraphQLList(UserType) },
        success: { type: GraphQLBoolean },
        error: { type: GraphQLList(ErrorType) },
    })
})


const ReturnType = new GraphQLObjectType({
    name: 'Return',
    fields: () => ({
        code: { type: GraphQLInt },
        message: { type: GraphQLString },
        details: { type: GraphQLString },
    })
})


const ErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: () => ({
        code: { type: GraphQLInt },
        message: { type: GraphQLString },
        details: { type: GraphQLString },
    })
})



module.exports = {
    Create,
    GetUserType,
    ReturnType,
    ErrorType,
    UserType
}