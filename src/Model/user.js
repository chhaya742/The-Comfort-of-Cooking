const bcrypt = require("bcrypt");
require("../database/schema/user");
const messages = require("../Comman/messages");
const statusCode = require("../Comman/statusCode");
const { sign } = require("jsonwebtoken");
const query = require("../comman/query");

const { Resp, response } = require("../Comman/response");

const userRegistration = async (userData) => {
    const token = sign({ password: userData.password }, process.env.JWT_SECRET_KEY, { expiresIn: "6h" })
    var data = await query.insert('user', userData);
    data.push({token:token})
    // console.log(data);
    return data;
}

const userLogin = async (email, password) => {
    var data = await query.getbyId('user', { 'email': email })
    // console.log(data);
    if (data.length!=0) {
        if(bcrypt.compareSync(password, data[0].Password)){
            for (i in data[0]) {
                if (i == 'createdAt' || i == 'updatedAt' || i == 'confirm_password'||i=='otp') {
                    delete data[0][i];
                }
            }
            return data,response(true, statusCode.Created, messages.login,data)
        }
        else{
            return response(false, 400, messages.incPass, null)
        }
    }
    else {
        return response(false, 400, messages.notExist, null)
        
        
    }

}

const getUser = async (id) => {
    const data = await query.getbyId('user', { 'id': id });
    for (i in data[0]) {
        if (i == 'createdAt' || i == 'updatedAt' || i == 'confirm_password'||i=='otp') {
            delete data[0][i];
        }
    }
    return data
}



module.exports = {userRegistration ,userLogin,getUser}
