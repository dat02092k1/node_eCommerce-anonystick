'use strict';

const mongoose = require('mongoose');
const shopModel = require('../models/shop.model');
   
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { Api403Error, BusinessLogicError } = require('../core/error.response');

const RoleShop = {
    SHOP: 'SHOP',
    WRITTER: 'WRITTER',
    EDITER: 'EDITER', 
    ADMIN: 'ADMIN'
}

class AccessService { 
    static signUp = async ({ name, email, password }) => {
            // s1: check email existence
            const hodelShop = await shopModel.findOne({ email }).lean(); // return JS object 

            if (hodelShop) {
                    throw new Api403Error('Error: Shop already exists');
            }

            const passwordHash = await bcrypt.hash(password, 10); 

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if (newShop) {
                // create private key & public key
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { 
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });

                console.log(privateKey, '---', publicKey);

                // save collection Keystore
                const publicKeyString = await keyTokenService.createToken({
                    userId: newShop._id, publicKey
                });
                
                if (!publicKeyString) {
                    throw new BusinessLogicError('Error: Create publicKeyString failed'); 
                }
                
                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                 
                // create token pair
                const tokens = await createTokenPair({
                    userId: newShop._id,
                    email
                }, publicKeyString, privateKey)
                
                console.log(`creating token pair::`, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
    }
}

module.exports = AccessService;