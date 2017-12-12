var Router = require('restify-router').Router;
var db = require("../../../db");
var PurchaseOrderExternalManager = require("dl-module").managers.garmentPurchasing.PurchaseOrderExternalManager;
var resultFormatter = require("../../../result-formatter");

var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';
var ObjectId = require("mongodb").ObjectId;
var DLModels = require('dl-models');
var poStatusEnum = DLModels.purchasing.enum.PurchaseOrderStatus;

function getRouter() {
    var router = new Router();
    router.get("/", passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new PurchaseOrderExternalManager(db, request.user);

            var query = request.queryInfo;

            var filter = {
                _deleted: false,
                isPosted: true,
                isClosed: false,
                status: {
                    '$ne': poStatusEnum.VOID
                },
                $or: [
                    { isOverBudget: true, isApproved: true },
                    { isOverBudget: false }],
                supplierId: new ObjectId(query.filter.supplierId)
            };

            query.filter = filter;

            var select = [
                "_id",
                "no",
                "items.poNo",
                "items.poId",
                "items.prNo",
                "items.prId",
                "items.prRefNo",
                "items.roNo",
                "items.productId",
                "items.product",
                "items.defaultQuantity",
                "items.defaultUom",
                "items.dealQuantity",
                "items.dealUom",
                "items.realizations",
                "items.isClosed",
                "items.useIncomeTax",
                "items.quantityConversion",
                "items.uomConversion",
                "items.conversion"
            ];

            query.select = select;

            manager.read(query)
                .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs.data);
                    delete docs.data;
                    result.info = docs;
                    response.send(200, result);
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
