var Router = require('restify-router').Router;
var db = require("../../../db");
var DeliveryOrderManager = require("dl-module").managers.garmentPurchasing.DeliveryOrderManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new DeliveryOrderManager(db, request.user);
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
                           var NoSJ = _data._id.NoSJ;
                           var TgSJ = moment(new Date(_data._id.TgSJ)).format(dateFormat);
                           var TgDtg = moment(new Date(_data._id.TgDtg)).format(dateFormat);
                           var KdSpl = _data._id.KdSpl;
                           var NmSpl = _data._id.NmSpl;
                           var SJDesc = _data._id.SJDesc;
                           var TipeSJ = _data._id.TipeSJ;
                           var NoKirim = _data._id.NoKirim;
                           var PunyaInv = _data._id.PunyaInv ? "Ya" : "Tidak";
                           var CekBon= _data._id.CekBon ? "Ya" : "Tidak";
                           var POID = _data._id.PlanPO + "1";
                           var PlanPO = _data._id.PlanPO;
                           var QtyDtg = _data._id.QtyDtg;
                           var SatDtg = _data._id.SatDtg;
                           var SatKnv = _data._id.SatKnv;
                           var Konversi = _data._id.Koversi;
                           var QtyKcl = _data._id.Koversi * _data._id.QtyDtg;
                           var Tempo = _data._id.Tempo;
                           var dueDays = new Date(_data._id.TgSJ);
							   dueDays.setDate(dueDays.getDate() + Tempo);
					       var TgJT= moment(new Date(dueDays)).format(dateFormat);
                           var MtUang = _data._id.MtUang;
                           var Rate = _data._id.Rate;
                           var UserIn = _data._id.UserIn;
                           var TgIn = moment(new Date(_data._id.TgIn)).format(dateFormat);
                           var UserEd = _data._id.UserEd;
                           var TgEd = moment(new Date(_data._id.TgEd)).format(dateFormat);
                   
                           var _item = {
                               
                                "NoSJ" : _data._id.NoSJ,
                                "TgSJ" : moment(new Date(_data._id.TgSJ)).format(dateFormat),
                                "TgDtg" : moment(new Date(_data._id.TgDtg)).format(dateFormat),
                                "KdSpl" : _data._id.KdSpl,
                                "NmSpl" : _data._id.NmSpl,
                                "SJDesc" : _data._id.SJDesc,
                                "TipeSJ" : _data._id.TipeSJ,
                                "NoKirim" : _data._id.NoKirim,
                                "PunyaInv" : _data._id.PunyaInv ? "Ya" : "Tidak",
                                "CekBon" : _data._id.CekBon ? "Ya" : "Tidak",
                                "POID" : _data._id.PlanPO + "1",
                                "PlanPO" : _data._id.PlanPO,
                                "QtyDtg" : _data._id.QtyDtg,
                                "SatDtg" : _data._id.SatDtg,
                                "SatKnv" : _data._id.SatKnv,
                                "Konversi" : _data._id.Konversi,
                                "QtyKcl" : _data._id.Konversi * _data._id.QtyDtg,
                                "Tempo" : _data._id.Tempo,
                                "TgJT" : moment(new Date(dueDays)).format(dateFormat),
                                "MtUang" : _data._id.MtUang,
                                "Rate" : _data._id.Rate,
                                "UserIn" : _data._id.UserIn,
                                "TgIn" : moment(new Date(_data._id.TgIn)).format(dateFormat),
                                "UserEd" : _data._id.UserEd,
                                "TgEd" : moment(new Date(_data._id.TgEd)).format(dateFormat)                                                      
                            }
                                data.push(_item);
                        }    

                        var options = {
                                "NoSJ" : "string",
                                "TgSJ" : "date",
                                "TgDtg" : "date",
                                "KdSpl" : "string",
                                "NmSpl" : "string",
                                "SJDesc" : "string",
                                "TipeSJ" : "string",
                                "NoKirim" : "string",
                                "PunyaInv" : "string",
                                "CekBon" : "string",
                                "POID" : "string",
                                "PlanPO" : "string",
                                "QtyDtg" : "number",
                                "SatDtg" : "string",
                                "SatKnv" : "string",
                                "Konversi" : "number",
                                "QtyKcl" : "number",
                                "Tempo" : "number",
                                "TgJT" : "date",
                                "MtUang" : "string",
                                "Rate" : "number",
                                "UserIn" : "string", 
                                "TgIn" : "date", 
                                "UserEd" : "string", 
                                "TgEd" : "date" 
                    };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment Surat Jalan.xlsx`, data,options);
                      } else 
                        response.xls(`Garment Surat Jalan.xlsx`, data,options);
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
