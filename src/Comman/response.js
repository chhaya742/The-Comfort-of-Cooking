const Resp=(callback,res)=>{
    res.send(callback)
}


const response = ( status, status_code,message, data) => {
    return {
        status: status,
        status_code: status_code,
        message: message,
        data:data
    }
}

module.exports = {response,Resp}