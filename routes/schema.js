const graphql = require('graphql')
const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList
} = graphql
const axios = require('axios');



const MenuItem = new GraphQLObjectType({
    name: 'MenuItemType',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
    })
})




const Restaurant = new GraphQLObjectType({
    name: 'RestaurantType',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        menu: { type: GraphQLList(MenuItem) }
    })
})


const Customer = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString }
    })
})



const Order = new GraphQLObjectType({
    name: 'OrderType',
    fields: () => ({
        id: { type: GraphQLString },
        customerId: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        order: { type: GraphQLList(GraphQLString) }
    })
})




//without assigning id
/*
{
   restaurants{
       id
       name
       email
       location
       menu{
           name
           price
       }
   }
}
*/




//with assigning id
/*
{
   restaurant(id:"res_1"){
       id
       name
       email
       location
       menu{
           name
           price
       }
   }
}
*/


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        restaurants: {
            type: GraphQLList(Restaurant),
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/restaurants`)
                .then(res => res.data)
            }
        },
        restaurant: {
            type: Restaurant,
            args: {id:{type: GraphQLString}},
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/restaurant/${args.id}`)
                .then(res => res.data)
            }
        },
        customers: {
            type: GraphQLList(Customer),
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/customers`)
                .then(res => res.data)
            }
        },
        customer: {
            type: Customer,
            args: {id:{type: GraphQLString}},
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/customer/${args.id}`)
                .then(res => res.data)
            }
        },
        orders: {
            type: GraphQLList(Order),
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/orders`)
                .then(res => res.data)
            }
        },
        order: {
            type: Order,
            args: {id:{type: GraphQLString}},
            resolve (parentValue, args) {
                return axios.get(`http://localhost:3000/order/${args.id}`)
                .then(res => res.data)
            }
        }
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery
})