
module.exports = (sequelize, dataTypes) => {
    const users = sequelize.define("users", 
    {  
        firstName: {type:dataTypes.STRING},
        lastName:{type:dataTypes.STRING },
        age:{type:dataTypes.INTEGER },
        city:{type:dataTypes.STRING },
        role:{type:dataTypes.STRING },
        mobileNumber:{type:dataTypes.STRING },
        companyId:{type:dataTypes.INTEGER},
        email:{type:dataTypes.STRING },
        password:{type:dataTypes.STRING },
        dashboardId:{type:dataTypes.INTEGER },
        createdAt:{type:dataTypes.DATE(6)},         
        updatedAt:{type:dataTypes.DATE(6)}             
    });
    return users;
}
