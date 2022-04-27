// const config = require("../config");
const db = require("../models");
const userDb = db.users;
const config = require('../config');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
var userContext = function () { }



//======================================================================
//get all users
//======================================================================
userContext.prototype.getAllUsers = async function (token) {
    try {
        let verifyToken = jwt.verify(token, config.jwtSecret);
        if (token != undefined && verifyToken) {
            var otpinfo = jwt_decode(token);
            let rows;
            if (otpinfo.role == 'admin') {
                rows = await userDb.findAll()
            } else {
                rows = await userDb.findAll({ where: { companyId: otpinfo.companyId } })
            }
            if (rows.length != 0) {
                let collect = []
                rows.map(row => {
                    collect.push(row.dataValues);
                })
                return [result = {
                    data: collect,
                    success: true,
                    error: null
                }];
            }
            else {
                return [result = {
                    data: null,
                    success: false,
                    error: [{
                        code: 401,
                        message: "Not Found Any User",
                        details: null
                    }]
                }];
            }
        } else {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 401,
                    message: "Access Denied!",
                    details: null
                }]
            }];
        }
    }
    catch (e) {
        return [result = {
            data: null,
            success: false,
            error: [{
                code: 500,
                message: e.message,
                details: null
            }]
        }];
    }
}




//======================================================================
//get user by id
//======================================================================
userContext.prototype.getUserById = async function (userId, token) {
    try {
        let verifyToken = jwt.verify(token, config.jwtSecret);
        var otpinfo = jwt_decode(token);
        if (token != undefined && verifyToken) {
            let result = await userDb.findAll({ where: { id: userId } })
            if (result[0]?.dataValues?.companyId == otpinfo.companyId && result.length != 0) {
                if (otpinfo.role == 'admin') {
                    result = await userDb.findAll()
                } 
                if (result.length != 0) {
                    // let row = result[0].dataValues;
                    let collect = []
                    result.map(row => {
                        collect.push(row.dataValues);
                    })
                    return [result = {
                        data: collect,
                        success: true,
                        error: null
                    }];
                }else{
                    return [result = {
                        data: null,
                        success: false,
                        error: [{
                            code: 500,
                            message: "User Not Found",
                            details: null
                        }]
                    }];
                }
            }else{
                return [result = {
                    data: null,
                    success: false,
                    error: [{
                        code: 401,
                        message: "Access Denied!",
                        details: null
                    }]
                }];
            }
        } else {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 401,
                    message: "Access Denied!",
                    details: null
                }]
            }];
        }
    }
    catch (e) {
        return [result = {
            data: null,
            success: false,
            error: [{
                code: 500,
                message: e.message,
                details: null
            }]
        }];
    }
}





//======================================================================
//create user
//======================================================================
userContext.prototype.createUser = async function (newUser) {
    try {
        let rows = await userDb.create(newUser)

        if (rows.dataValues.id) {
            return [result = {
                data: null,
                success: true,
                error: null
            }];
        }
        else {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 500,
                    message: "User Not Created",
                    details: null
                }]
            }];
        }
    }
    catch (e) {
        return [result = {
            data: null,
            success: false,
            error: [{
                code: 500,
                message: e.message,
                details: null
            }]
        }];
    }
}



//======================================================================
//create user
//======================================================================
userContext.prototype.updateUser = async function (user, token) {
    try {
        let rows = await userDb.update({
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            city: user.city,
            mobileNumber: user.mobileNumber,
            companyId: user.companyId,
            role: user.role,
            email: user.email,
            password: user.password,
            dashboardId: user.dashboardId,
        }, { where: { id: user.id } })

        if (rows[0] != 0) {
            return [result = {
                data: null,
                success: true,
                error: null
            }];
        }
        else {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 500,
                    message: "User Not Found",
                    details: null
                }]
            }];
        }
    }
    catch (e) {
        return [result = {
            data: null,
            success: false,
            error: [{
                code: 500,
                message: e.message,
                details: null
            }]
        }];
    }
}



//======================================================================
//delete user by id
//======================================================================
userContext.prototype.deleteUser = async function (userId, token) {
    //get token from header in graphql
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];	  
    // var otpinfo = jwt_decode(token);
    //verify token
    try {
        let verifyToken = jwt.verify(token, config.jwtSecret);
        if (!verifyToken) {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 401,
                    message: "Access Denied!",
                    details: null
                }]
            }];
        }

        let rows = await userDb.destroy({ where: { id: userId } })
        if (rows != 0) {
            console.log(rows);
            return [result = {
                data: null,
                success: true,
                error: null
            }];
        }
        else {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 401,
                    message: "Not Found Any User",
                    details: null
                }]
            }];
        }
    }
    catch (e) {
        return [result = {
            data: null,
            success: false,
            error: [{
                code: 500,
                message: e.message,
                details: null
            }]
        }];
    }
}




//======================================================================
//login user by email and password
//======================================================================
userContext.prototype.login = async function (userData) {
    try {
        let rows = await userDb.findAll({ where: { email: userData.email, password: userData.password } })
        if (rows.length != 0) {
            const token = jwt.sign({
                email: userData.email,
                role: rows[0].dataValues.role,
                companyId: rows[0].dataValues.companyId,
            }, config.jwtSecret, { expiresIn: '1d' });

            return [result = {
                data: token,
                success: true,
                error: null
            }];
        }
        else {
            return [result = {
                data: null,
                success: false,
                error: [{
                    code: 401,
                    message: "User Not Found!",
                    details: null
                }]
            }];
        }
    }
    catch (e) {
        return [result = {
            data: null,
            success: false,
            error: [{
                code: 500,
                message: e.message,
                details: null
            }]
        }];
    }
}



module.exports = userContext;
// export default await userContext;