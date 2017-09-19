const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseRequestManager;
var JwtRouterFactory = require("../../jwt-router-factory");

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_createdDate": -1
        }
    });
    return router;
}
module.exports = getRouter;
