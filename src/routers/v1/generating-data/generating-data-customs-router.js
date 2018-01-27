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
                   
                           var NoBC= _data._id.NoBC;
                           var TgBC= moment(new Date(_data._id.TgBC)).add(offset, 'h').format(dateFormat);
                           var TgValid= moment(new Date(_data._id.TgValid)).add(offset, 'h').format(dateFormat);
                           var TipeBC= _data._id.TipeBC;
                           var QtyBC = _data._id.QtyBC;
                           var SatBC = _data._id.SatBC;
                           var Brutto=_data._id.Brutto;
                           var Netto=_data._id.Netto;
                           var TgIn= moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat);
                           var UserIn= _data._id.UserIn;
                           var TgEd= moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat);
                           var UserEd = _data._id.UserEd;
                           
                           var _item = {
                                "NoBC" : _data._id.NoBC,
                                "TgBC" : moment(new Date(_data._id.TgBC)).add(offset, 'h').format(dateFormat),
                                "TgValid" : moment(new Date(_data._id.TgBC)).add(offset, 'h').format(dateFormat),
                                "TipeBC" : _data._id.TipeBC,
                                "QtyBC" : _data._id.QtyBC,
                                "SatBC" : _data._id.SatBC,
                                "Brutto" : _data._id.Brutto,
                                "Netto":_data._id.Netto,
                                "TgIn" : moment(new Date(_data._id.TgIn)).add(offset, 'h').format(dateFormat),
                                "UserIn" : _data._id.UserIn,
                                "TgEd" : moment(new Date(_data._id.TgEd)).add(offset, 'h').format(dateFormat),
                                "UserEd" : _data._id.UserEd                                
                            }
                                data.push(_item);
                        }    

                        var options = {
                                        "NoBC" : "string",
                                        "TgBC" : "date",
                                        "TgValid" : "date",
                                        "TipeBC" : "string",
                                        "QtyBC" : "number",
                                        "SatBC" : "string",
                                        "Brutto" : "number",
                                        "Netto": "number",
                                        "TgIn" : "date",
                                        "UserIn" : "string",
                                        "TgEd" : "date",
                                        "UserEd" : "string"                                             
                                       };
                   
                     if(sdate!=undefined && edate!=undefined)
                      {
                        response.xls(`Garment Bea Cukai.xlsx`, data,options);
                      } else 
                        response.xls(`Garment Bea Cukai.xlsx`, data,options);
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

