'use strict';

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt');

const RoleShop = {
    SHOP: 'SHOP',
    WRITTER: 'WRITTER',
    EDITER: 'EDITER', 
    ADMIN: 'ADMIN'
}

class AccessService { 
    static signUp = async ({ name, email, password }) => {
        try {
            // s1: check email existence

            const hodelShop = await shopModel.findOne({ email }).lean(); // return JS object 

            if (hodelShop) {
                return {
                    code: 'xxx',
                    message: 'Shop already exists'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10); 

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if (newShop) {
                
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error',
            }
        }
    }
}

module.exports = AccessService;