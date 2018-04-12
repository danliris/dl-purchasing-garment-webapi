var Router = require('restify-router').Router;
var db = require("../../../db");
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseOrderManager;
var resultFormatter = require("../../../result-formatter");
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();

    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new Manager(db, request.user);
            var dateFrom = request.params.dateFrom;
            var dateTo = request.params.dateTo;
            var offset = request.headers["x-timezone-offset"] ? Number(request.headers["x-timezone-offset"]) : 0;

           manager.getDataKirim(dateFrom, dateTo,offset)
                .then(docs => {
                    if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                        var result = resultFormatter.ok(apiVersion, 200, docs);
                        response.send(200, result);
                    } else {

                        var dateFormat = "DD/MM/YYYY";
                        var dateFormat2 = "DD MMMM YYYY";
                        var locale = 'id-ID';
                        var moment = require('moment');
                        moment.locale(locale);

                        var data = [];
                        var index = 0;
                        for (var purchaseRequest of docs) {
                                index++;
                        
                                var _item = {
                                    "No": index,
                                    "Supplier": purchaseRequest._id.supplier,
                                    "OK %": purchaseRequest.Cek.toFixed(0),
                                    "Jumlah": purchaseRequest.count,
                                }
                                data.push(_item);
                        }

                        var options = {
                            "No": "number",
                            "Supplier": "string",
                            "OK %": "string",
                            "Jumlah": "string",
                        };
                        response.xls(`Monitoring Ketepatan Pengiriman - ${moment(dateFrom).format(dateFormat2)} - ${moment(dateTo).format(dateFormat2)}.xlsx`, data, options);

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