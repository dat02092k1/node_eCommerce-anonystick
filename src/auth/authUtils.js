'use strict';
const jwt = require('jsonwebtoken'); 

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        console.log(publicKey);
        // access token
        const accessToken = await jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '2 days' });
        
        // refresh token
        const refreshToken = await jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7 days' });

        jwt.verify( accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('decoded verify', decode);
            }
        }); 
        
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createTokenPair
};