/**
 * Manages all the JSON Web Token related operations. 
 */

const jwt = require('jsonwebtoken');

/**
 * Verifies json web token.
 * 
 * @param {Request} request 
 * @param {Response} response 
 * @param {CallableFunction} next  
 */

async function verifyToken(request, response, next) {
    const bearerHeader = request.headers['authorization'];
    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (error, data) => {
                if (error && error instanceof jwt.TokenExpiredError) {
                    request.headers['authorization'] = null;
                    throw error;
                }
                else if (error) {
                    throw error;
                }
                else {
                    // isResourceAuthorize(request).then((data) => {
                    //     if (data)
                            next();
                    //     else throw new Error('Insufficient permissions.');
                    // }).catch((error) => {
                    //     response.json({
                    //         isError: true,
                    //         message: error.message
                    //     }).end();
                    //     return;
                    // });
                }
                
            });
        }
        else throw new Error('Missing authorization header.');
    } catch (error) {
        response.status(401).json({ isError: true, message: error.message });
    }
}

async function signToken(tokenType, payload) {
    if (tokenType.toUpperCase() === 'ACCESS_TOKEN') {
        return jwt.sign(payload, JWT_CONFIGURATION.secretKey, { expiresIn: JWT_CONFIGURATION.expiresIn });
    } else if (tokenType.toUpperCase() === 'REFRESH_TOKEN') {
        return jwt.sign(payload, JWT_CONFIGURATION.secretKey);
    }
}


module.exports = {
    verifyToken,
    signToken
}