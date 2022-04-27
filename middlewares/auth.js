// middlewares.js

// const { ForbiddenError } = require("apollo-server-express");

// exports.getClaims = (req) => {

// // const getClaims = (req) => {
//   if (req) {
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




const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const config = require('../config');


const getClaims = (token) => {
    let verifyToken = jwt.verify(token, config.jwtSecret);

    if (token != undefined && verifyToken) {
        try {
            // return the user information from the token
            return jwt_decode(token);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }else{
        return 
    }
}
let verifyToken = jwt.verify(token, config.jwtSecret);
if (token != undefined && verifyToken) {
    var otpinfo = jwt_decode(token);
}else{

}


module.exports = { getClaims };