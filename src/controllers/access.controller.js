'use strict';

const { asyncHandler } = require("../auth/checkAuth");
const { CREATED, OK } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
     login = asyncHandler(async (req, res, next) => {
        OK(res, 'Login success', await AccessService.login(req.body))
    })

    signUp = asyncHandler(async (req, res, next) => {
        console.log(`[P]::v::signUp::`, req.body);

        /**
         * 200 OK
         * 201 Created  
         */
        CREATED(res, 'Register success', await AccessService.signUp(req.body))
        // return res.status(201).json(
        //     await AccessService.signUp(req.body)
        // );
})
}

module.exports = new AccessController();
