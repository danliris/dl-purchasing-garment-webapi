// PURCHASE REQUEST
var v1PurchaseRequestByTagsRouter = require('../src/routers/v1/purchase-request/purchase-request-by-tags-router');
var v1PurchaseRequestByUserRouter = require('../src/routers/v1/purchase-request/purchase-request-by-user-router');
var v1PurchaseRequestMonitoringRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-router');
var v1PurchaseRequestMonitoringAllUserRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-all-user-router');
var v1PurchaseRequestRouter = require('../src/routers/v1/purchase-request/purchase-request-router');

module.exports = function (server) {
    //PURCHASE REQUEST
    v1PurchaseRequestByTagsRouter().applyRoutes(server, "/v1/purchase-requests/by-tags");
    v1PurchaseRequestByUserRouter().applyRoutes(server, "/v1/purchase-requests/by-user");
    v1PurchaseRequestMonitoringAllUserRouter().applyRoutes(server, "/v1/purchase-requests/monitoring/all-user");
    v1PurchaseRequestMonitoringRouter().applyRoutes(server, "/v1/purchase-requests/monitoring");
    v1PurchaseRequestRouter().applyRoutes(server, "/v1/purchase-requests");
};