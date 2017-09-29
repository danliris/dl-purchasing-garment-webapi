const apiVersion = '1.0.0';
var JwtRouterFactory = require("../../jwt-router-factory");
var Router = require("restify-router").Router;
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");
var passport = require("../../../passports/jwt-passport");
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseOrderManager;

function getRouter() {
    var router = new Router();

    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new Manager(db, request.user);

            var query = request.query;
            query = Object.assign(query, {
                offset: request.headers["x-timezone-offset"] ? Number(request.headers["x-timezone-offset"]) : 7,
                xls: (request.headers.accept || '').toString().indexOf("application/xls") > -1
            })

            manager.getPurchaseReport(query)
                .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs.data);
                    delete docs.data;
                    result.info = docs;
                    return Promise.resolve(result);
                })
                .then(result => {
                    if (!query.xls) {
                        response.send(result.statusCode, result);
                    }
                    else {
                        manager.getXlsPurchaseReport(result, query)
                            .then(xls => {
                                response.xls(xls.name, xls.data, xls.options);
                            });
                    }
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                })
        })
    });
    return router;
}

module.exports = getRouter;