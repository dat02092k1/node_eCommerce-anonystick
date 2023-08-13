'use strict';
const jwt = require('jsonwebtoken'); 
const asyncHandler = require('../helpers/asyncHandler');
const { Api401Error, Api404Error } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id', 
    AUTHORIZATION: 'authorization',
}

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

const authentication = asyncHandler (async (req, res, next) => {
    /**
     * 1 - check userId missing??? 
     * 2 - get access token 
     * 3 - verify Token
     * 4 - check user exists ? 
     * 5 - check keyStore with this userId
     * 6 - OK all => return next() 
     */
    // 1
    const userId = req.headers[HEADER.CLIENT_ID];
     
    if (!userId) throw new Api401Error('Invalid request'); 

    // 2
    const keyStore = await findByUserId(userId); 

    if (!keyStore) throw new Api404Error('Not found keystore'); 
    
    // 3 
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new Api404Error('Invalid request');
    console.log('qdn1');
    try {
        const decodedUser = jwt.verify(accessToken, keyStore.publicKey); 
        console.log(decodedUser);
        if (userId !== decodedUser.userId) throw new Api401Error('Invalid userId');

        req.keyStore = keyStore; 

        return next(); 
    } catch (error) {
        throw error;
    }
    
})

module.exports = {
    createTokenPair,
    authentication
};