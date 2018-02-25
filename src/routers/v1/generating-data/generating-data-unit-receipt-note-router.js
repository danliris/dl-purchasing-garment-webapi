var Router = require('restify-router').Router;
var db = require("../../../db");
var UnitReceiptNoteManager = require("dl-module").managers.garmentPurchasing.UnitReceiptNoteManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new UnitReceiptNoteManager(db, request.user);
            var sdate = request.params.dateFrom;
            var edate = request.params.dateTo;
            var offset = 7//request.headers["x-timezone-offset"] ? Number(request.headers["x-timezone-offset"]) : 0;
            
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

                           var NoBon= _data._id.NoBon;
                           var TgBon= moment(new Date(_data._id.TgBon)).add(offset, 'h').format(dateFormat);
                           var TipeTrm = "PEMBELIAN";
                           var Asal = "Pembelian Eksternal";
                           var Konf= _data._id.Konf;
                           var KdSpl=_data._id.KdSpl;
                           var NmSpl=_data._id.NmSpl;
                           var NoSJ=_data._id.NoSJ;
                           var TgSJ=moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat);
                           var TgDtg=moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat);
                           var Lokasi = _data._id.Lokasi;
                           var PlanPO=_data._id.PlanPO;
                           var NoRO=_data._id.NoRO;
                           var KdBrg=_data._id.KdBrg;
                           var NmBrg=_data._id.NmBrg;
                           var SatBon =_data._id.SatBon;
                           var QtyBon = _data._id.QtyBon;
                           var SatKOnv =_data._id.SatBon;
                           var Konversi = _data._id.Konversi;
                           var TgIn= moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat);
                           var UserIn= _data._id.UserIn;
                           var TgEd= moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat);
                           var UserEd = _data._id.UserEd;
                           
                           var _item = {

                           "NoBon" : _data._id.NoBon,
                           "TgBon" : moment(new Date(_data._id.TgBon)).add(offset, 'h').format(dateFormat),
                           "TipeTrm" : "PEMBELIAN",
                           "Asal" : "Pembelian Eksternal",
                           "Konf" : _data._id.Konf,
                           "KdSpl" : _data._id.KdSpl,
                           "NmSpl" : _data._id.NmSpl,
                           "NoSJ" : _data._id.NoSJ,
                           "TgSJ" : moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat),
                           "TgDtg" : moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat),
                           "Lokasi" : _data._id.Lokasi,
                           "PlanPO" : _data._id.PlanPO,
                           "NoRO" : _data._id.NoRO,
                           "KdBrg" : _data._id.KdBrg,
                           "NmBrg" : _data._id.NmBrg,
                           "SatBon" : _data._id.SatBon,
                           "QtyBon" : _data._id.QtyBon,
                           "SatKOnv" : _data._id.SatBon,
                           "Konversi" : _data._id.Konversi,
                           "TgIn" : moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat),
                           "UserIn" : _data._id.UserIn,
                           "TgEd" : moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat),
                           "UserEd" : _data._id.UserEd                                                               
                            }
                                data.push(_item);
                        }    

                        var options = {
                                        "NoBon" : "string",
                                        "TgBon" : "date",
                                        "TipeTrm" : "string",
                                        "Asal" : "string",
                                        "Konf" : "string",
                                        "KdSpl" : "string",
                                        "NmSpl" : "string",
                                        "NoSJ" : "string",
                                        "TgSJ" : "date",
                                        "TgDtg" : "date",
                                        "Lokasi" : "string",
                                        "PlanPO" : "string",
                                        "NoRO" : "string",
                                        "KdBrg" : _data._id.KdBrg,
                                        "NmBrg" : _data._id.NmBrg,
                                        "SatBon" : _data._id.SatBon,
                                        "QtyBon" : _data._id.QtyBon,
                                        "SatKOnv" : _data._id.SatBon,
                                        "Konversi" : _data._id.Konversi,
                                        "TgIn" : moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat),
                                        "UserIn" : _data._id.UserIn,
                                        "TgEd" : moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat),
                                        "UserEd" : _data._id.UserEd                                                
                                       };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment Bon Unit.xlsx`, data,options);
                      } else 
                        response.xls(`Garment Bon Unit.xlsx`, data,options);
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

