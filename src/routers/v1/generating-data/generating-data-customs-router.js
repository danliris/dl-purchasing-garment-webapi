var Router = require('restify-router').Router;
var db = require("../../../db");
var CustomsManager = require("dl-module").managers.garmentPurchasing.CustomsManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new CustomsManager(db, request.user);

            var dateFormat = "MM/DD/YYYY";
            var locale = 'en-US';
            var moment = require('moment');
            moment.locale(locale);
            var dateFrom = request.params.dateFrom;
            var dateTo = request.params.dateTo;
            var filter = {};
            if (dateFrom && dateTo) {
                filter = {
                    customsDate: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo)
                    }
                };
            }

            manager.getAllData(filter)
                .then(list => {
                    var Tqty = 0
                    var Thrg = 0
                    var data = [];
                    for (var _data of list) {
                        for (var SJ of _data.deliveryOrders) {
                            for (var item of SJ.items) {
                                for (var fulfillment of item.fulfillments) {
                                     var _item = {
                                     "NOMOR BEA CUKAI": _data.no,
                                     "TANGGAL BEA CUKAI": moment(new Date(_data.customsDate)).add(offset, 'h').format(dateFormat),
                                     "TANGGAL PENGESAHAN": moment(new Date(_data.validateDate)).add(offset, 'h').format(dateFormat),
                                     "TIPE BEA CUKAI": _data.customsType,
                                     "ASAL BEA CUKAI": _data.customsOrigin,
                                     "KODE SUPPLIER": _data.supplier.code,
                                     "NAMA SUPPLIER": _data.supplier.name,
                                     "JUMLAH KEMASAN": _data.amountOfPackaging,
                                     "KEMASAN": _data.packaging,
                                     "BRUTTO (KG)": _data.bruto,
                                     "NETTO (KG)": _data.netto,
                                     "MATA UANG": _data.currency.code,
                                     "NOMOR SURAT JALAN": SJ.no,
                                     "TANGGAL SURAT JALAN": moment(new Date(SJ.date)).add(offset, 'h').format(dateFormat),
                                     "TANGGAL BARANG DATANG": moment(new Date(SJ.supplierDoDate)).add(offset, 'h').format(dateFormat),
                                     "NOMOR PO EXTERNAL": item.purchaseOrderExternalNo,
                                     "NOMOR PURCHASE REQUEST": fulfillment.purchaseRequestNo,
                                     "KODE BARANG": fulfillment.product.code,
                                     "NAMA BARANG": fulfillment.product.name +" - " + fulfillment.product.description,
                                     "JUMLAH BARANG": fulfillment.deliveredQuantity,
                                     "SATUAN BARANG": fulfillment.purchaseOrderUom.unit,
                                     "HARGA SATUAN BARANG": fulfillment.pricePerDealUnit,
                                     "HARGA TOTAL BARANG": fulfillment.pricePerDealUnit * fulfillment.deliveredQuantity,
                                     "USER INPUT": _data._createdBy,
                                     "TANGGAL INPUT": moment(new Date(_data._createdDate)).add(offset, 'h').format(dateFormat),
                                     "USER EDIT": _data._updatedBy,
                                     "TANGGAL EDIT": moment(new Date(_data._updatedDate)).add(offset, 'h').format(dateFormat)
                                     }
                                     data.push(_item);
                            }
                          }
                        }
                    }
                    var options = {
                        "NOMOR BEA CUKAI": "string",
                        "TANGGAL BEA CUKAI": "date",
                        "TANGGAL PENGESAHAN": "date",
                        "TIPE BEA CUKAI": "string",
                        "ASAL BEA CUKAI": "string",
                        "KODE SUPPLIER": "string",
                        "NAMA SUPPLIER": "string",
                        "JUMLAH KEMASAN": "number",
                        "KEMASAN": "string",
                        "BRUTO (KG)": "number",
                        "NETTO (KG)": "number",
                        "KEMASAN": "string",
                        "NOMOR SURAT JALAN": "string",
                        "TANGGAL SURAT JALAN": "date",
                        "TANGGAL BARANG DATANG": "date",
                        "NOMOR PO EXTERNAL": "string",
                        "NOMOR PURCHASE REQUEST": "string",
                        "KODE BARANG": "string",
                        "NAMA BARANG": "string",
                        "JUMLAH BARANG": "number",
                        "SATUAN BARANG": "string",
                        "HARGA SATUAN BARANG": "number",
                        "HARGA TOTAL BARANG": "number",
                        "USER INPUT": "string",
                        "TANGGAL INPUT": "date",
                        "USER EDIT": "string",
                        "TANGGAL EDIT": "date"
                    };

                    if (data.length === 0) {
                        var _item = {
                        "NOMOR BEA CUKAI": "",
                        "TANGGAL BEA CUKAI": "",
                        "TANGGAL PENGESAHAN": "",
                        "TIPE BEA CUKAI": "",
                        "ASAL BEA CUKAI": "",
                        "KODE SUPPLIER": "",
                        "NAMA SUPPLIER": "",
                        "JUMLAH KEMASAN": "",
                        "KEMASAN": "",
                        "BRUTO (KG)": "",
                        "NETTO (KG)": "",
                        "KEMASAN": "",
                        "NOMOR SURAT JALAN": "",
                        "TANGGAL SURAT JALAN": "",
                        "TANGGAL BARANG DATANG": "",
                        "NOMOR PO EXTERNAL": "",
                        "NOMOR PURCHASE REQUEST": "",
                        "KODE BARANG": "",
                        "NAMA BARANG": "",
                        "JUMLAH BARANG": "",
                        "SATUAN BARANG": "",
                        "HARGA SATUAN BARANG": "",
                        "HARGA TOTAL BARANG": "",
                        "USER INPUT": "",
                        "TANGGAL INPUT": "",
                        "USER EDIT": "",
                        "TANGGAL EDIT": ""
                        }
                        data.push(_item);
                    }
                    if (dateFrom && dateTo) {
                        response.xls(`Garment Bea Cukai.xlsx`, data, options);
                    } else {
                        response.xls(`Garment Bea Cukai.xlsx`, data, options);
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

