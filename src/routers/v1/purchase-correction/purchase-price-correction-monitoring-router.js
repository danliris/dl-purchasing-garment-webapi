var Router = require('restify-router').Router;
var db = require("../../../db");
var PurchasePriceCorrectionManager = require("dl-module").managers.garmentPurchasing.PurchasePriceCorrection;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {

    var getManager = (user) => {
        return db.get()
            .then((db) => {
                return Promise.resolve(new PurchasePriceCorrectionManager(db, user));
            });
    };

    var router = new Router();
    router.get("/", passport, function (request, response, next) {
        var user = request.user;
        var query = request.query;
        var offset = request.headers["x-timezone-offset"] ? Number(request.headers["x-timezone-offset"]) : 0;
       
        query.offset=offset;
        var PurchasePriceCorrectionManager = {};
        getManager(user)
            .then((manager) => {
                PurchasePriceCorrectionManager = manager;
                return PurchasePriceCorrectionManager.getPurchasePriceCorrectionReport(query,user);
            })
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs);
                return Promise.resolve(result);
            })
            .then((result) => {
                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                    response.send(result.statusCode, result);
                }
                else{
                    PurchasePriceCorrectionManager.getPurchasePriceCorrectionReportXls(result, query)
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