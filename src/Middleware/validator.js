const message = require("../comman/messages");
const {response}=require("../comman/response")
const messages = require("../comman/messages");
const statusCode = require("../comman/statusCode");
const {update}=require("../comman/query")
function valiDate(schema) {
    return async (req, res, next) => {
        try {
            const validateBody = await schema.validate(req.body)
            req.body = validateBody
            next();
        } catch (error) {
            res.send(response(false, 400, error.errors[0], null))
        }
    }
}

const validator=(req,res,next)=>{
    var fullLink = req.protocol + "://" + req.hostname + req.originalUrl;
    const url = fullLink.split("/")[4]
    if(url=='register'){
        if(req.body.password==req.body.confirm_password){
            next()
        }
        else{
            res.send(response(false, 201, message.notmatch, null))
        }

    }
}
const isOtpMatch = async (data, email, otp = 0) => {
    if(data==undefined){
        return response(false, statusCode.no_content, messages.notExist, null);
    }
    if (data.length == 0) {
        return response(false, statusCode.no_content, messages.notExist, null);
    } else if (otp ==0) {
        const otpcode = Math.floor(Math.random() * 10000 + 1);
        var dataResp = await update('user', { otp: otpcode }, { 'email': email });
        return response(true, statusCode.Created, messages.sendOtp, email);
    } else if (otp > 0) {
        if (data[0].otp == otp) {
            update('user', { 'otp': null }, { "email": email });
            for (i in data[0] ){
                if(i=='otp' || i=='createdAt'|| i=='updatedAt'){
                    delete data[0][i]; 
                }
            }
            return data, response(true, statusCode.Created, messages.varifyOtp, data);
        } else {
            return response(false, statusCode.notFound, messages.otpNotmatch);
        }
    } else {
        return response(true, statusCode.Created, messages.sendOtp, email);
    }
}
module.exports={valiDate,validator,isOtpMatch}