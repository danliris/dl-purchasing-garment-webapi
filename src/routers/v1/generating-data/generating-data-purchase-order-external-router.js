var Router = require('restify-router').Router;
var db = require("../../../db");
var PurchaseOrderExternalManager = require("dl-module").managers.garmentPurchasing.PurchaseOrderExternalManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new PurchaseOrderExternalManager(db, request.user);
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            var offset = 7//request.headers["x-timezone-offset"] ? Number(request.headers["x-timezone-offset"]) : 7;
            
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
                           var PoExt= _data._id.PoExt;
                           var TgPoExt= moment(new Date(_data._id.TgPoExt)).add(offset, 'h').format(dateFormat);
                           var Dlvry= moment(new Date(_data._id.Dlvry)).add(offset, 'h').format(dateFormat);
                           var KdSpl= _data._id.KdSpl;
                           var NmSpl= _data._id.NmSpl;
                           var Ongkir= _data._id.Ongkir;
                           var TipeByr= _data._id.TipeByr;
                           var MtdByr= _data._id.MtdByr;
                           var Tempo= _data._id.Tempo;
                           var MtUang= _data._id.MtUang;
                           var RateMU= _data._id.RateMU;
                           var PakaiPPN= _data._id.PakaiPPN ? "Ya" : "Tidak";
                           var PakaiPPH= _data._id.PakaiPPH ? "Ya" : "Tidak";
                           var RatePPH= _data._id.RatePPH;
                           var Status= _data._id.Status;
                           var PRNo = _data._id.PRNo;
                           var PlanPO = _data._id.PlanPO;
                           var POID = _data._id.PlanPO + "1";
                           var RONo = _data._id.RONo;
                           var KdBrg =  _data._id.KdBrg;
                           var NmBrg = _data._id.NmBrg;
                           var QtyOrder = _data._id.QtyOrder;
                           var SatOrder = _data._id.SatOrder;
                           var QtyBeli =  _data._id.QtyBeli;
                           var RemainingQty = 0;
                           var SatBeli = _data._id.SatBeli;
                           var SatKonv = _data._id.SatKonv;
                           var Konversi =_data._id.Konversi;
                           var HargaSat = _data._id.HargaSat;
                           var HargaTotal =  _data._id.HargaSat * _data._id.QtyBeli;
                           var KdByr = _data._id.KdByr;
                           var Konf = _data._id.Konf;
                           var Article = _data._id.Article;

                           var _item = {
                               "PoExt": _data._id.PoExt,
                               "TgPoExt": moment(new Date(_data._id.TgPoExt)).add(offset, 'h').format(dateFormat),
                               "Dlvry": moment(new Date(_data._id.Dlvry)) .add(offset , 'h').format(dateFormat),
                               "KdSpl": _data._id.KdSpl,
                               "NmSpl": _data._id.NmSpl,
                               "Ongkir": _data._id.Ongkir,
                               "TipeByr": _data._id.TipeByr,
                               "MtdByr": _data._id.MtdByr,
                               "Tempo": _data._id.Tempo,
                               "MtUang": _data._id.MtUang,
                               "RateMU": _data._id.RateMU,
                               "PakaiPPN": _data._id.PakaiPPN ? "Ya" : "Tidak",
                               "PakaiPPH": _data._id.PakaiPPH ? "Ya" : "Tidak",
                               "RatePPH": _data._id.RatePPH,
                               "Status": _data._id.Status,
                               "PRNo": _data._id.PRNo,
                               "PlanPO": _data._id.PlanPO,
                               "POID": _data._id.PlanPO + "1",
                               "RONo": _data._id.RONo,
                               "KdBrg": _data._id.KdBrg,
                               "NmBrg": _data._id.NmBrg,
                               "QtyOrder": _data._id.QtyOrder,
                               "SatOrder": _data._id.SatOrder,
                               "QtyBeli": _data._id.QtyBeli,
                               "RemainingQty": 0,
                               "SatBeli": _data._id.SatBeli,
                               "SatKonv": _data._id.SatKonv,
                               "Konversi":_data._id.Konversi,
                               "HargaSat": _data._id.HargaSat,
                               "HargaTotal": _data._id.HargaSat * _data._id.QtyBeli,
                               "KdByr" : _data._id.KdByr,
                               "Konf" : _data._id.Konf,
                               "Article" : _data._id.Article
                            }
                                data.push(_item);
                        }    

                        var options = {
                                    "PoExt": "string",
                                    "TgPoExt": "date",
                                    "Dlvry": "date",
                                    "KdSpl": "string",
                                    "NmSpl": "string",
                                    "Ongkir": "string",
                                    "TipeByr": "string",
                                    "MtdByr": "string",
                                    "Tempo": "number",
                                    "MtUang": "string",
                                    "RateMU": "string",
                                    "PakaiPPN": "string",
                                    "PakaiPPH": "string",
                                    "RatePPH": "number",
                                    "Status": "string",
                                    "PRNo": "string",
                                    "PlanPO": "string",
                                    "POID": "string",
                                    "RONo": "string",
                                    "KdBrg": "string",
                                    "NmBrg": "string",
                                    "QtyOrder": "number",
                                    "SatOrder": "string",
                                    "QtyBeli": "number",
                                    "RemainingQty": "number",
                                    "SatBeli": "string",
                                    "SatKonv": "string",
                                    "Konversi": "number",
                                    "HargaSat": "number",
                                    "HargaTotal": "number",
                                    "KdByr" : "string",
                                    "Konf" : "string",
                                    "Article" : "string"
                    };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment PO External.xlsx`, data,options);
                      } else 
                        response.xls(`Garment PO External.xlsx`, data,options);
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
