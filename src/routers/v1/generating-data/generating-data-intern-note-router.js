var Router = require('restify-router').Router;
var db = require("../../../db");
var InternNoteManager = require("dl-module").managers.garmentPurchasing.InternNoteManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new InternNoteManager(db, request.user);
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
                           var NoNI= _data._id.NoNI;
                           var TgNI= moment(new Date(_data._id.TgNI)).add(offset, 'h').format(dateFormat);
                           var MtUang = _data._id.MtUang;
                           var Rate = _data._id.Rate;
                           var KdSpl = _data._id.KdSpl;
                           var NmSpl = _data._id.NmSpl;
                           var NoInv= _data._id.NoInv;
                           var TgInv= moment(new Date(_data._id.TgInv)).add(offset, 'h').format(dateFormat);
                           var NoSJ= _data._id.NoSJ;
                           var TgSJ= moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat);
                           var TgDtg= moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat);
                           var Tempo= _data._id.Tempo;
                           var dueDays = new Date(_data._id.TgSJ);
							   dueDays.setDate(dueDays.getDate() + Tempo);
					       var TgJT= moment(new Date(dueDays)).add(offset, 'h').format(dateFormat);
                           var PoExt= _data._id.PoExt;
                           var PlanPO= _data._id.PlanPO;
                           var POID= _data._id.PlanPO+"1";
                           var NoRO= _data._id.NoRO;
                           var TipeByr= _data._id.TipeByr;
                           var TermByr= _data._id.TermByr;
                           var KdBrg= _data._id.KdBrg;
                           var Nmbrg= _data._id.NmBrg;
                           var SatNI= _data._id.SatNI;
                           var Qty= _data._id.Qty;
                           var Harga= _data._id.Harga;  
                           var TotHrg= _data._id.Qty * _data._id.Harga;  
                           var TotNI = _data.TotNI;
                           var TgIn= moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat);
                           var UserIn= _data._id.UserIn;
                           var TgEd= moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat);
                           var UserEd = _data._id.UserEd;
                        
                           var _item = {
                                "NoNI" : _data._id.NoNI,
                                "TgNI" : moment(new Date(_data._id.TgNI)).add(offset, 'h').format(dateFormat),
                                "MtUang" : _data._id.MtUang,
                                "Rate" : _data._id.Rate,
                                "KdSpl" : _data._id.KdSpl,
                                "NmSpl" : _data._id.NmSpl,
                                "NoInv": _data._id.NoInv,
                                "TgInv": moment(new Date(_data._id.TgInv)).add(offset, 'h').format(dateFormat),
                                "NoSJ": _data._id.NoSJ,
                                "TgSJ": moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat),
                                "TgDtg": moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat),
                                "Tempo": _data._id.Tempo,
                                "TgJT": moment(new Date(dueDays)).add(offset, 'h').format(dateFormat),
                                "PoExt": _data._id.PoExt,
                                "PlanPO": _data._id.PlanPO,
                                "POID": _data._id.PlanPO+"1",
                                "NoRO": _data._id.NoRO,
                                "TipeByr": _data._id.TipeByr,
                                "TermByr": _data._id.TermByr,
                                "KdBrg": _data._id.KdBrg,
                                "Nmbrg": _data._id.NmBrg,
                                "SatNI": _data._id.SatNI,
                                "Qty": _data._id.Qty,
                                "Harga": _data._id.Harga, 
                                "TotHrg": _data._id.Qty * _data._id.Harga, 
                                "TotNI" : _data.TotNI,
                                "TgIn" : moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat),
                                "UserIn" : _data._id.UserIn,
                                "TgEd" : moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat),
                                "UserEd" : _data._id.UserEd,   
                            }
                                data.push(_item);
                        }    

                        var options = {
                                        "NoNI" : "string",
                                        "TgNI" : "date",
                                        "MtUang" : "string",
                                        "Rate" : "number",
                                        "KdSpl" : "string",
                                        "NmSpl" : "string",
                                        "NoInv": "string",
                                        "TgInv": "date",
                                        "NoSJ": "string",
                                        "TgSJ": "date",
                                        "TgDtg": "date",
                                        "TgJT": "date",
                                        "PoExt": "string",
                                        "PlanPO": "string",
                                        "POID": "string",
                                        "NoRO": "string",
                                        "TipeByr": "string",
                                        "TermByr": "string",
                                        "KdBrg": "string",
                                        "Nmbrg": "string",
                                        "SatNI": "string",
                                        "Qty": "number",
                                        "Harga": "number", 
                                        "TotHrg": "number", 
                                        "TotNI" : "number",
                                        "TgIn" : "date",
                                        "UserIn" : "string",
                                        "TgEd" : "date",
                                        "UserEd" : "string",
                                       };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment Nota Intern.xlsx`, data,options);
                      } else 
                        response.xls(`Garment Nota Intern.xlsx`, data,options);
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
