// PURCHASE REQUEST
var v1PurchaseRequestByUserRouter = require('../src/routers/v1/purchase-request/purchase-request-by-user-router');
var v1PurchaseRequestMonitoringRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-router');
var v1PurchaseRequestMonitoringAllUserRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-all-user-router');
var v1PurchaseRequestRouter = require('../src/routers/v1/purchase-request/purchase-request-router');

module.exports = function (server) {
    //PURCHASE REQUEST
    v1PurchaseRequestByUserRouter().applyRoutes(server, "/purchase-requests/by-user");
    v1PurchaseRequestMonitoringRouter().applyRoutes(server, "/purchase-requests/monitoring");
    v1PurchaseRequestMonitoringAllUserRouter().applyRoutes(server, "/purchase-requests/monitoring-all-user");
    v1PurchaseRequestRouter().applyRoutes(server, "/purchase-requests");
};