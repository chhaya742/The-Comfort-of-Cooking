const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10);
const userModel = require('../Model/user')
const messages = require("../Comman/messages");
const statusCode = require("../Comman/statusCode");
const { Resp, response } = require("../Comman/response");


const userRegister = (req, res) => {
    let body = req.body
    if (!body.Name && !body.Email && !body.Phone && !body.Password) { throw new Error('Insufficient params.') }
    
    body.Password = bcrypt.hashSync(body.Password, salt)
    userModel.userRegistration(req.body).then((data) => {
        userModel.getUser(data[0]).then((result) => {
            Resp(response(true, statusCode.Created, messages.register, result), res)
        })
    }).catch((err) => {
        Resp(response(false, statusCode.Server_err, err.sqlMessage), res)
    })
};

const userLogin = async (req, res) => {
    userModel.userLogin(req.body.Email, req.body.Password).then((result) => {
        Resp(result, res)
    }).catch((err) => {
        // console.log(err);
        Resp(response(false, statusCode.Server_err, err.sqlMessage), res)
    })

}

// const login = (req, res) => {
//     userLogin(req.body.email, req.body.password).then((result) => {
//         Resp(result,res)
//     }).catch((err) => {
//         console.log(err);
//         Resp(response(false, statusCode.Server_err, err.sqlMessage),res)
//     })
// }

// const getUserById = (req, res) => {
//     getUser(req.user.user_id).then(data => {
//         Resp(response(true, statusCode.Created, messages.foundData), res)
//     }).catch((err) => {
//         Resp(response(false, statusCode.Server_err, err.sqlMessage),res)
//     })
// };

// const Update = (req, res) => {
//     updateUser(req.user.user_id, req.body, res.filepath).then((data) => {
//         Resp(response(true, statusCode.Created, messages.update), res)
//     }).catch((err) => {
//         Resp(response(false, statusCode.Server_err, err.sqlMessage),res)
//     })
// };

// const forgotpass = (req, res) => {
//     forgotPass(req.body.email).then((data) => {
//         Resp(data, res)
//     }).catch((err) => {console.log(err);
//         Resp(response(false, statusCode.Server_err, err.sqlMessage),res)

//     })

// }
// const varifyotp = (req, res) => {
//     varifyOtp(req.body.email, req.body.otp).then((result) => {
//         Resp(result,res)
//     }).catch((err) => {
//         console.log(err)
//         Resp(response(false, statusCode.Server_err, err.sqlMessage),res)
//     });



// };
// const resetpass = (req, res) => {
//     // console.log(req.user);
//     if(req.user.email==req.body.email){
//         resetPass(req.body.newPassword, req.body.email).then((result) => {
//         Resp(response(true, statusCode.Created, messages.update, result),res)
//     }).catch((err) => {
//         console.log(err);
//         Resp(response(false, statusCode.Server_err, err.sqlMessage),res)

//     });
//     }else{
//         Resp(response(false, statusCode.no_content, messages.notExist,null),res)

//     }


// };
// module.exports = { getUserById, Update, register, forgotpass, login, varifyotp, resetpass }

module.exports = { userRegister, userLogin }