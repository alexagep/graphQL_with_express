const {
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = require('graphql')

var _usercontext = require("../context/userContext");
var userContext= new _usercontext();
const { UserType,GetUserType,Create,ErrorType,ReturnType } = require('../schema/schema');




const loginQuery = {
    type: GraphQLList(Create),
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve (parentValue, args) {
        let user = await userContext.login(args);
        return user;
    }
}


const createQuery = {
    type: GraphQLList(Create),
    args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        city: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        companyId: { type: GraphQLInt },
        email: { type: GraphQLString },
        dashboardId: { type: GraphQLInt },
    },
    async resolve (parentValue, args) {
        let user = await userContext.createUser(args);
        console.log('/****/', user);
        return user;
    }
}


const updateQuery = {
    type: GraphQLList(Create),
    args: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        city: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        companyId: { type: GraphQLInt },
        email: { type: GraphQLString },
        dashboardId: { type: GraphQLInt },
    },
    async resolve (parentValue, args, req) {
        let token = req.rawHeaders[1].split(' ')[1];
        let user = await userContext.updateUser(args, token);
        // console.log('/****/', user);
        return user;
    }
}


const deleteQuery = {
    type: GraphQLList(Create),
    args: {
        id: { type: GraphQLInt },
    },
    async resolve (parentValue, args, req) {
        let token = req.rawHeaders[1].split(' ')[1];
        let user = await userContext.deleteUser(args.id, token);
        return user;
    }
}


const getallQuery = {
    type: GraphQLList(GetUserType),
    async resolve (root, args, req) {
        let token = req.rawHeaders[1].split(' ')[1];
        // console.log('/****/', req.rawHeaders[1].split(' ')[1]);
        let user = await userContext.getAllUsers(token)
        return user
    }
}


const getUserQuery = {
    type: GraphQLList(GetUserType),
    args: {
        id: { type: GraphQLInt },
    },
    async resolve (root, args, req) {
        let token = req.rawHeaders[1].split(' ')[1];
        let user = await userContext.getUserById(args.id, token)
        console.log(user);
        return user
    }
}


module.exports = {
    loginQuery,
    createQuery,
    updateQuery,
    deleteQuery,
    getallQuery,
    getUserQuery
}