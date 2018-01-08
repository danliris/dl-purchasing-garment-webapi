var Router = require('restify-router').Router;
var db = require("../../../db");
var PurchasePriceCorrection = require("dl-module").managers.garmentPurchasing.PurchasePriceCorrection;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new PurchasePriceCorrection(db, request.user);
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            var offset = request.headers["x-timezone-offset"] ? Number(request.headers["x-timezone-offset"]) : 0;
            
            manager.getAllData(sdate, edate, offset)
                .then(docs => {
                if ((request.headers.accept || '').toString().indexOf("application/xls") < 0) {
                        var result = resultFormatter.ok(apiVersion, 200, docs);
                        response.send(200, result);
                    }
                else {
                    var dateFormat = "MM/DD/YYYY";
                    var locale = 'en-US';
                    var moment = require('moment');
                    moment.locale(locale);
                    var data = [];
                    for (var _data of docs) {
                           var NoNK= _data._id.NoNK;
                           var TgNK= moment(new Date(_data._id.TgNK)).add(offset, 'h').format(dateFormat);
                           var Jenis= _data._id.Jenis;
                           var Ketr= _data._id.Ketr;
                           var MtUang = _data._id.MtUang;
                           var Rate = _data._id.Rate;
                           var KdSpl=_data._id.KdSpl;
                           var NmSpl=_data._id.NmSpl;
                           var NoSJ=_data._id.NoSJ;
                           var TgSJ=moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat);
                           var TgDtg=moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat);
                           var QtySJ = _data._id.QtySJ;
                           var HrgSJ = _data._id.HrgSJ;
                           var TotSJ = _data._id.TotSJ;
                           var POExt=_data._id.POExt;
                           var NoPR=_data._id.NoPR;
                           var PlanPO=_data._id.PlanPO;
                           var NoRO=_data._id.NoRO;
                           var KdBrg=_data._id.KdBrg;
                           var NmBrg=_data._id.NmBrg;
                           var Satuan=_data._id.Satuan;
                           var Qty = _data._id.Qty;
                           var Harga = _data._id.Harga;
                           var Total = _data._id.Total;
                           
                           var QtyNK = _data._id.Qty - _data._id.QtySJ;
                           var HrgNK = _data._id.Harga - _data._id.HrgSJ;
                           var TotNK = _data._id.Total - _data._id.TotSJ;
                        
                           var TgIn= moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat);
                           var UserIn= _data._id.UserIn;
                           var TgEd= moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat);
                           var UserEd = _data._id.UserEd;
                           
                           var _item = {
                                "NoNK" : _data._id.NoNK,
                                "TgNK" : moment(new Date(_data._id.TgNK)).add(offset, 'h').format(dateFormat),
                                "Jenis" : _data._id.Jenis,
                                "Ketr" : _data._id.Ketr,
                                "MtUang" : _data._id.MtUang,
                                "Rate" : _data._id.Rate,
                                "KdSpl":_data._id.KdSpl,
                                "NmSpl":_data._id.NmSpl,
                                "NoSJ":_data._id.NoSJ,
                                "TgSJ":moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat),
                                "TgDtg":moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat),
                                "QtySJ" : _data._id.QtySJ,
                                "HrgSJ" : _data._id.HrgSJ,
                                "TotSJ" : _data._id.TotSJ,
                                "POExt":_data._id.POExt,
                                "NoPR":_data._id.NoPR,
                                "PlanPO":_data._id.PlanPO,
                                "NoRO":_data._id.NoRO,
                                "KdBrg":_data._id.KdBrg,
                                "NmBrg":_data._id.NmBrg,
                                "Satuan":_data._id.Satuan,
                                "Qty" : _data._id.Qty,
                                "Harga" : _data._id.Harga,
                                "Total" : _data._id.Total,

                                "QtyNK" : _data._id.Qty - _data._id.QtySJ,
                                "HrgNK" : _data._id.Harga - _data._id.HrgSJ,
                                "TotNK" : _data._id.Total - _data._id.TotSJ,
                        
                                "TgIn" : moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat),
                                "UserIn" : _data._id.UserIn,
                                "TgEd" : moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat),
                                "UserEd" : _data._id.UserEd                                
                            }
                                data.push(_item);
                        }    

                        var options = {
                                        "NoNK" : "string",
                                        "TgNK" : "date",
                                        "Jenis" : "string",
                                        "Ketr" : "string",
                                        "MtUang" : "string",
                                        "Rate" : "number",
                                        "KdSpl":"string",
                                        "NmSpl":"string",
                                        "NoSJ":"string",
                                        "TgSJ":"date",
                                        "TgDtg":"date",
                                        "QtySJ" : "number",
                                        "HrgSJ" : "number",
                                        "TotSJ" : "number",
                                        "POExt":"string",
                                        "NoPR":"string",
                                        "PlanPO":"string",
                                        "NoRO":"string",
                                        "KdBrg":"string",
                                        "NmBrg":"string",
                                        "Satuan":"string",
                                        "Qty" : "number",
                                        "Harga" : "number",
                                        "Total" : "number",
                                        "QtyNK" : "number",
                                        "HrgNK" : "number",
                                        "TotNK" : "number",
                                        "TgIn" : "date",
                                        "UserIn" : "string",
                                        "TgEd" : "date",
                                        "UserEd" : "string"                                             
                                       };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment NK Harga.xlsx`, data,options);
                      } else 
                        response.xls(`Garment NK Harga.xlsx`, data,options);
                      }
                })
                .catch(e => {
                    response.send(500, "Collecting Data Failed...!!!");
                });

              }).catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
            });
    });
    return router;
}
module.exports = getRouter;

