const apiVersion = '1.0.0';
var GarmentPurchaseOrder = require("dl-module").managers.garmentPurchasing.PurchaseOrderManager;
var Router = require('restify-router').Router;
var db = require("../../../db");

var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');

function getRouter() {

    var defaultOrder = {
        "_updatedDate": -1
    };

    var getManager = (user) => {
        return db.get()
            .then((db) => {
                return Promise.resolve(new GarmentPurchaseOrder(db, user));
            });
    };

    var router = new Router();

    router.get("/", passport, function (request, response, next) {
        var user = request.user;
        var query = request.query;
        query.user=user.username;
        query.order = Object.assign({}, defaultOrder, query.order);
        var PurchaseOrderManager = {};
        getManager(user)
            .then((manager) => {
                PurchaseOrderManager = manager;
                return PurchaseOrderManager.getDurationPoExtDo(query);
            })
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                return Promise.resolve(result);
            })
            .then((result) => {
                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                    response.send(result.statusCode, result);
                }
                else{
                    PurchaseOrderManager.getXlsDurationPoExtDo(result, query)
                        .then(xls => {
                            response.xls(xls.name, xls.data, xls.options)
                        });
                }
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });
    return router;
}

module.exports = getRouter;