//running server with GraphQL
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { graphql, buildSchema } = require('graphql');
// const graphSchema = require('./routes/schema')
const graphSchema = require('./routes/user')
const config = require('./config');
const jwt = require('jsonwebtoken');
const { rule, shield, and, or, not } = require('graphql-shield');
const { ApolloServer } = require('apollo-server');
var app = express();



// Construct a schema, using GraphQL schema language
// var typeDefs = buildSchema(`
//     type Query {
//       users: [User!]!
//       login(email:String!, password:String!): String
//     }  
//     type Mutation{
//       createUser(firstName: String!, age: Int, city: String!, password: String!, role: String! ): [User]
//     }  
//     type User{
//       id: ID!
//       firstName: String!
//       lastName: String!
//       age: Int
//       city: String!
//       role: String!
//       mobileNumber: String
//       companyId: Int
//       password: String!
//       dashboardId: Int
//       email: String
//     }  
// `);



// // The rootValue provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
//   hello2: () => {
//     return true;
//   },
//   hello3: () => {
//     // myArr.push(message)
//     return myArr;
//   },
//   hello4: () => {
//     return 11;
//   }
// };



// function getClaims(req) {
//   let token;
//   try {
//     token = jwt.verify(req.request.headers.authorization, config.jwtSecret);
//   } catch (e) {
//     return null;
//   }
//   console.log(token);
//   return token;
// }


// Rules
const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  console.log(ctx.claims);
  return ctx.claims !== null;
});
const createUser = rule()(async (parent, args, ctx, info) => {
  return ctx.claims.role === "admin";
});


// Permissions
const permissions = shield({
  Query: {
    getall: and(isAuthenticated),
  }
  ,
  Mutation: {
    addUser: and(isAuthenticated, createUser),
  },
});

// get the user info from a JWT
// const getClaims = req => {
//   if (req) {
//     console.log(req.query);
//       try {
//           let token = req.req.rawHeaders[1].split(' ')[1];
//           // return the user information from the token
//           return jwt.verify(token, config.jwtSecret);
//       } catch (err) {
//           // if there's a problem with the token, throw an error
//           throw new Error('Session invalid');
//       }
//   }
// }; 



app.use('/graphql', graphqlHTTP({
  schema: graphSchema,
//   rootValue: root,
  graphiql: true,
  // middlewares: [permissions],
  // context: ({ req }) => {
  //   // get the user token from the headers
  //    const token = req.headers.authorization;
  //    console.log(1);
  //    // try to retrieve a user with the token
  //    const user = getUser(token);
  //    // for now, let's log the user to the console:
  //    console.log(user);
  //    // add the db models and the user to the context
  //    return { models, user };
  // } 

//   context: (req) => ({
//     claims: getClaims(req),
//   }),
}));



// const server = new ApolloServer({
//   typeDefs,
//   graphSchema,
//   middlewares: [permissions],
//   context: (req) => ({
//     claims: getClaims(req),
//   }),
// });


// server.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));


app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));