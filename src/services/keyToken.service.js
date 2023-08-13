'use strict';

const keytokenModel = require("../models/keytoken.model");
const { Types } = require('mongoose');

class keyTokenService {
    static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // level 0
            // const publicKeyString = publicKey.toString(); 

            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString
            // });

            // level xxx
            const filter = { user: userId }, update = {
                publicKey, privateKey, refreshTokenUsed: [], refreshToken
            }, options = { upsert: true, new: true };

            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId)});
    }

    static removeKeyById = async (id) => {
        
        let delKey = await keytokenModel.deleteOne({'_id': id });
        console.log(delKey);

        if (!delKey) return 'key not found';

        return delKey;
    }
}

module.exports = keyTokenService;