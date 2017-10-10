var Router = require('restify-router').Router;
var db = require("../../../db");
var DeliveryOrderManager = require("dl-module").managers.garmentPurchasing.DeliveryOrderManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get("/", passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new DeliveryOrderManager(db, {
                username: 'router'
            });

            var query = request.queryInfo;

            var filter = {
                "_deleted": false,
                "isClosed": false,
                "$or": [{ hasCustoms: false, useCustoms: false }, { hasCustoms: true, useCustoms: true }],
                "supplierId": new ObjectId(query.filter.supplierId)
            };
            query.filter = filter;

            var select = [
                "no",
                "refNo",
                "date",
                "supplierDoDate",
                "supplierId",
                "supplier._id",
                "supplier.code",
                "supplier.name",
                "isPosted",
                "isClosed",
                "items.isClosed",
                "items.purchaseOrderExternalId",
                "items.purchaseOrderExternalNo",
                "items.paymentDueDays",
                "items.paymentType",
                "items.paymentMethod",
                "items.fulfillments.purchaseOrderQuantity",
                "items.fulfillments.purchaseOrderUom._id",
                "items.fulfillments.purchaseOrderUom.unit",
                "items.fulfillments.deliveredQuantity",
                "items.fulfillments.realizationQuantity",
                "items.fulfillments.productId",
                "items.fulfillments.product._id",
                "items.fulfillments.product.code",
                "items.fulfillments.product.name",
                "items.fulfillments.purchaseOrderId",
                "items.fulfillments.purchaseOrderNo",
                "items.fulfillments.purchaseRequestId",
                "items.fulfillments.purchaseRequestNo",
                "items.fulfillments.purchaseRequestRefNo",
                "items.fulfillments.roNo",
                "items.fulfillments.pricePerDealUnit",
                "items.fulfillments.quantityConversion",
                "items.fulfillments.uomConversion",
                "items.fulfillments.conversion",
                "items.fulfillments.currency"
            ];

            query.select = select

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