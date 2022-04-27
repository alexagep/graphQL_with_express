// const graphql = 
const {
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = require('graphql')
const db = require("../models");
const axios = require('axios');
const userDb = db.users;
const config = require('../config');
// const getClaims = require('../middlewares/auth');
var _usercontext = require("../context/userContext");
var userContext = new _usercontext();
// @ts-ignore
// const { UserType,GetUserType,Create,ErrorType,ReturnType } = require('../schema/schema');
const { loginQuery, createQuery, updateQuery, getallQuery, getUserQuery, deleteQuery } = require('../queries/users');





const AxiosUserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})


const MathOperation = new GraphQLObjectType({
    name: 'MathType',
    fields: () => ({
        numberOne: { type: GraphQLInt },
        numberTwo: { type: GraphQLInt },
        operation: { type: GraphQLString },
        result: { type: GraphQLInt }
    })
})



// const Create = new GraphQLObjectType({
//     name: 'CreateUser',
//     fields: () => ({
//         data: { type: GraphQLString },
//         success: { type: GraphQLBoolean },
//         error: { type: GraphQLList(ReturnType) },
//     })
// })



// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLInt },
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         city: { type: GraphQLString },
//         role: { type: GraphQLString },
//         mobileNumber: { type: GraphQLString },
//         companyId: { type: GraphQLInt },
//         email: { type: GraphQLString },
//         password: { type: GraphQLString },
//         dashboardId: { type: GraphQLInt },
//     })
// })



// const GetUserType = new GraphQLObjectType({
//     name: 'GetUserById',
//     fields: () => ({
//         data: { type: GraphQLList(UserType) },
//         success: { type: GraphQLBoolean },
//         error: { type: GraphQLList(ErrorType) },
//     })
// })

// const ReturnType = new GraphQLObjectType({
//     name: 'Return',
//     fields: () => ({
//         code: { type: GraphQLInt },
//         message: { type: GraphQLString },
//         details: { type: GraphQLString },
//     })
// })

// const ErrorType = new GraphQLObjectType({
//     name: 'Error',
//     fields: () => ({
//         code: { type: GraphQLInt },
//         message: { type: GraphQLString },
//         details: { type: GraphQLString },
//     })
// })


/*
{
   users{
       id
       name
       age
   }
}
*/


/*
{
   user(id:"22"){
       id
       name
       age
   }
}
*/


// const resolvers = {
//     Query: {
//       users: async (parent, args) => {
//         return userDb.findAll();
//       },
//       login: async (_, { email, password }) => {
//         let user = userDb.findAll((u) => u.email === email && u.password === password);
//         if(user){
//             const token = jwt.sign({
//                 email: userData.email, 
//                 role:  rows.role,
//                 companyId: rows.companyId,
//             }, config.jwtSecret, { expiresIn: '1d' });
//             return token;    
//         } else{
//             return "unknown user";
//         } 
//     },
//   },  
//     Mutation: {
//         createUser: async (_, { firstName, age, city, password, role }) => {
//             const newUser = {
//                 firstName: firstName,
//                 age: age,
//                 city: city,
//                 password: password,
//                 role: role,
//             };
//             userDb.create(newUser);
//             return "done";
//         },
//     },
//   };




// const resolvers = {
//     Query: {
//         login: async (parentValue, args) => {
//                 let user = await userContext.login(args);
//                 return user;
//         },

//         getall: async (root, args) => {
//                 let user = await userContext.getAllUsers()
//                 return user
//         },

//         getUser: async (_, {id}) => {
//                 let user = await userContext.getUserById(id)
//                 return user
//             }
//     },
//     Mutation: {
//         createUser: async (parentValue, args) => {
//                 let user = await userContext.createUser(args);
//                 return user;
//         },
//         updateUser: async (parentValue, args) => {
//                 let user = await userContext.updateUser(args);
//                 return user;
//         },
//         delete: async (_, {id}) => {
//                 // let token = req.request.headers.authorization.split(' ')[1];
//                 let user = await userContext.deleteUser(id);
//                 return user;
//         },
//     }
// }









const RootQuery = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            getall: getallQuery,
            getUser: getUserQuery,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'RootMutationType',
        fields: {
            login: loginQuery,
            create: createQuery,
            update: updateQuery,
            delete: deleteQuery,
        }
    })
})


// module.exports = resolvers;


module.exports = RootQuery;