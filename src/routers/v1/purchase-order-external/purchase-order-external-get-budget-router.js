var Router = require('restify-router').Router;
var db = require("../../../db");
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseOrderExternalManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new Manager(db, request.user);
            var purchaseRequestNo = request.query.filter.purchaseRequestNo;
            var purchaseRequestRefNo = request.query.filter.purchaseRequestRefNo;
            var productCode = request.query.filter.productCode;
            var purchaseOrderExternalNo = request.query.filter.purchaseOrderExternalNo;

            manager.getListUsedBudget(purchaseRequestNo, purchaseRequestRefNo, productCode, purchaseOrderExternalNo)
                .then(data => {
                    response.send(200, data);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                });

        })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    });
    return router;
}
module.exports = getRouter;
