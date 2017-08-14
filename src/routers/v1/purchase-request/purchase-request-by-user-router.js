const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseRequestManager;
var JwtRouterFactory = require("../../jwt-router-factory");

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_updatedDate": -1
        },
        defaultFilter: (request, response, next) => {
            return {
                "_createdBy": request.user.username
            };
        }
    });
    return router;
}

module.exports = getRouter;
