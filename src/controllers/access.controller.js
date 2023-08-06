'use strict';

const { asyncHandler } = require("../auth/checkAuth");
const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
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
