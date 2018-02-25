var Router = require('restify-router').Router;
var db = require("../../../db");
var InvoiceNoteManager = require("dl-module").managers.garmentPurchasing.InvoiceNoteManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new InvoiceNoteManager(db, request.user);
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
                           var NoInv = _data._id.NoInv;
                           var TgInv = moment(new Date(_data._id.TgInv)).add(offset, 'h').format(dateFormat);
                           var KdSpl = _data._id.KdSpl;
                           var NmSpl = _data._id.NmSpl;
                          
                           var PakaiPPN= _data._id.PakaiPPN ? "Ya" : "Tidak";
                           var PrsPPN= _data._id.PakaiPPN ? 10 : 0;

                           var PakaiPPH= _data._id.PakaiPPH ? "Ya" : "Tidak";
                           var PrsPPH = _data._id.PrsPPH;
                           var NoPPN = _data._id.NoPPN;
                           var TgPPN = moment(new Date(_data._id.TgPPN)).add(offset, 'h').format(dateFormat);
                           
                           var NoPPH = _data._id.NoPPH;
                           var TgPPH = moment(new Date(_data._id.TgPPH)).add(offset, 'h').format(dateFormat);
                           var NmPPH = _data._id.NmPPH;
                           var RatePPH = _data._id.RatePPH;
                           
                           var MtUang = _data._id.MtUang;
                           var Rate = _data._id.Rate;
                           var NoSJ = _data._id.NoSJ;
                           var TgSJ = moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat);
                           var TgDtg = moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat);
                           var PoExt = _data._id.PoExt;
                           var NoRO = _data._id.NoRO;
                           var NoPR = _data._id.NoPR;
                           var PlanPO = _data._id.PlanPO;
                           var KdBrg = _data._id.KdBrg;
                           var NmBrg = _data._id.NmBrg;
                           var QtyInv = _data._id.QtyInv;
                           var SatInv = _data._id.SatInv;
                           var HrgInv = _data._id.HrgInv;
                           var HrgTot = _data._id.QtyInv * _data._id.HrgInv;
                           var TQtyInv = _data.TQtyInv;
                           var TotInv = _data.TotInv;
                           
                           var TotPPN =  _data._id.PakaiPPN ? _data.TotInv * 0.1 : 0;
                           var TotPPH =  _data.TotInv * _data._id.RatePPH;
                           
                           var UserIn= _data._id.UserIn;
                           var TgIn= moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat);
                           var UserEd= _data._id.UserEd;
                           var TgEd= moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat);

                           var _item = {
                                "NoInv" : _data._id.NoInv,
                                "TgInv" : moment(new Date(_data._id.TgInv)).add(offset, 'h').format(dateFormat),
                                "KdSpl" : _data._id.KdSpl,
                                "NmSpl" : _data._id.NmSpl,
                                "PakaiPPN" : _data._id.PakaiPPN ? "Ya" : "Tidak",
                                "PakaiPPH" : _data._id.PakaiPPH ? "Ya" : "Tidak",
                                "PrsPPH" : _data._id.PrsPPH,
                                "PrsPPN" : _data._id.PakaiPPN ? 10 : 0,
                                "NoPPN" : _data._id.NoPPN,
                                "TgPPN" : moment(new Date(_data._id.TgPPN)).add(offset, 'h').format(dateFormat),
                                "NoPPH"  : _data._id.NoPPH,
                                "TgPPH" : moment(new Date(_data._id.TgPPH)).add(offset, 'h').format(dateFormat),
                                "NmPPH": _data._id.NmPPH,
                                "RatePPH" : _data._id.RatePPH,
                                "MtUang" : _data._id.MtUang,
                                "Rate" : _data._id.Rate,
                                "NoSJ" : _data._id.NoSJ,
                                "TgSJ" : moment(new Date(_data._id.TgSJ)).add(offset, 'h').format(dateFormat),
                                "TgDtg" : moment(new Date(_data._id.TgDtg)).add(offset, 'h').format(dateFormat),
                                "PoExt" : _data._id.PoExt,
                                "NoRO" : _data._id.NoRO,
                                "NoPR" : _data._id.NoPR,
                                "PlanPO" : _data._id.PlanPO,
                                "KdBrg" : _data._id.KdBrg,
                                "NmBrg" : _data._id.NmBrg,
                                "QtyInv" : _data._id.QtyInv,
                                "SatInv" : _data._id.SatInv,
                                "HrgInv" : _data._id.HrgInv,
                                "HrgTot" : _data._id.QtyInv * _data._id.HrgInv,
                                "TQtyInv" : _data.TQtyInv,
                                "TotInv" : _data.TotInv,
                                "TotPPN" :  _data._id.PakaiPPN ? _data.TotInv * 0.1 : 0,
                                "TotPPH" :  _data.TotInv * _data._id.RatePPH,
                                "UserIn" : _data._id.UserIn,
                                "TgIn" : moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat),
                                "UserEd" : _data._id.UserEd,
                                "TgEd" : moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat) 
                            }
                                data.push(_item);
                        }    

                        var options = {
                                        "NoInv" : "string",
                                        "TgInv" : "date",
                                        "KdSpl" : "string", 
                                        "NmSpl" : "string",
                                        "PakaiPPN" : "string",
                                        "PakaiPPH" : "string",
                                        "PrsPPH" : "number",
                                        "PrsPPN" : "number",
                                        "NoPPN" : "string",
                                        "TgPPN" : "date",
                                        "NoPPH"  : "string",
                                        "TgPPH" : "date",
                                        "NmPPH": "string",
                                        "RatePPH" : "string",
                                        "MtUang" : "string",
                                        "Rate" : "number",
                                        "NoSJ" : "string",
                                        "TgSJ" : "date",
                                        "TgDtg" : "date",
                                        "PoExt" : "string",
                                        "NoRO" : "string",
                                        "NoPR" : "string",
                                        "PlanPO" : "string",
                                        "KdBrg" : "string",
                                        "NmBrg" : "string",
                                        "QtyInv" : "number",
                                        "SatInv" : "string",
                                        "HrgInv" : "number",
                                        "HrgTot" : "number",
                                        "TQtyInv" : "number",
                                        "TotInv" : "number",
                                        "UserIn" : "string", 
                                        "TgIn" : "date", 
                                        "UserEd" : "string", 
                                        "TgEd" : "date"     
                                       };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment Invoice.xlsx`, data,options);
                      } else 
                        response.xls(`Garment Invoice.xlsx`, data,options);
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
