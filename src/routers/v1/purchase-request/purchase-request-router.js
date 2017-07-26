const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseRequestManager;
var JwtRouterFactory = require("../../jwt-router-factory");

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_updatedDate": -1
        },
        defaultSelect: ["no", "refNo", "roNo", "shipmentDate", "buyer", "unit.name", "unit.division.name","isPosted"]
    });
    return router;
}
module.exports = getRouter;
