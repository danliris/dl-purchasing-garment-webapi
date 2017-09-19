const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.garmentPurchasing.CustomsManager;
var JwtRouterFactory = require("../../jwt-router-factory");

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_createdDate": -1
        },
        defaultSelect:[]
    });
    return router;
}
module.exports = getRouter;