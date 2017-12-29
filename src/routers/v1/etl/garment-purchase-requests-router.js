var Router = require("restify-router").Router;

var JwtRouterFactory = require("../../jwt-router-factory");
var passport = require("../../../passports/jwt-passport");
var resultFormatter = require("../../../result-formatter");

var Manager = require("dl-module").etl.garment.garmentPurchaseRequestsEtl;

var db = require("../../../db");
var sqlConnect = require("../../sql-db");

const apiVersion = '1.0.0';

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_createdDate": 1,
        },
    });

    router.post('/migrate/file', passport, (request, response, next) => {
        request.connection.server.setTimeout(120 * 60000);
        response.connection.server.setTimeout(120 * 60000);
        request.connection.setTimeout(120 * 60000);
        response.connection.setTimeout(120 * 60000);

        request.connection._server.timeout = (120 * 60000);

        var user = request.user;
        var data = request.body;

        var tables = data.tables.split("&");
        var o = [data.date.trim()];
        var table1 = tables[0].trim();
        var table2 = tables[1].trim();
        var date = o[0];
        var i = data.i;
        var pageSize = data.pageSize;
        var buyer = data.buyer ? data.buyer.code : null;
        var year = data.year;

        Promise.all([db, sqlConnect])
            .then((result) => {
                var db = result[0];
                var sql = result[1];
                db.get().then((db) => {
                    var manager = new Manager(db, {
                        username: "unit-test"
                    }, sql);
                    manager.run(date, table1, table2, i, pageSize, buyer, year)
                        .then(data => {
                            var result = resultFormatter.ok(apiVersion, 200, data);
                            response.send(200, result);
                        })
                        .catch(e => {
                            response.send(500, "gagal");
                        });
                }).catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
            })

    });

    router.post('/get/data', passport, (request, response, next) => {

        var user = request.user;
        var data = request.body;

        var tables = data.tables.split("&");
        var o = [data.date.trim()];
        var table1 = tables[0].trim();
        var table2 = tables[1].trim();
        var date = o[0];
        var buyer = data.buyer ? data.buyer.code : null;
        var tahun = data.year;

        Promise.all([db, sqlConnect])
            .then((result) => {
                var db = result[0];
                var sql = result[1];
                db.get().then((db) => {
                    var manager = new Manager(db, {
                        username: "unit-test"
                    }, sql);

                    var monthOpt = ["latest",
                        "january", "february", "march",
                        "april", "may", "june",
                        "july", "august", "september",
                        "october", "november", "december"];

                    var tgl = monthOpt.indexOf(date);
                    var tempYear = tahun;
                    var dateStamp;

                    if (tgl == 1) {
                        dateStamp = tempYear + "-01%%";
                    } else if (tgl == 2) {
                        dateStamp = tempYear + "-02%%";
                    } else if (tgl == 3) {
                        dateStamp = tempYear + "-03%%";
                    } else if (tgl == 4) {
                        dateStamp = tempYear + "-04%%";
                    } else if (tgl == 5) {
                        dateStamp = tempYear + "-05%%";
                    } else if (tgl == 6) {
                        dateStamp = tempYear + "-06%%";
                    } else if (tgl == 7) {
                        dateStamp = tempYear + "-07%%";
                    } else if (tgl == 8) {
                        dateStamp = tempYear + "-08%%";
                    } else if (tgl == 9) {
                        dateStamp = tempYear + "-09%%";
                    } else if (tgl == 10) {
                        dateStamp = tempYear + "-10%%";
                    } else if (tgl == 11) {
                        dateStamp = tempYear + "-11%%";
                    } else if (tgl == 12) {
                        dateStamp = tempYear + "-12%%";
                    }

                    if (dateStamp) {
                        manager.getRowNumber(table1, table2, dateStamp, buyer)
                            .then(data => {
                                var result = resultFormatter.ok(apiVersion, 200, data);
                                response.send(200, result);
                            })
                            .catch(e => {
                                response.send(500, "gagal");
                            });
                    }
                    else {
                        var opt = table1;
                        manager.getTimeStamp(opt).then((result) => {
                            if (!buyer) {
                                if (result.length != 0 && result[0].status == "Successful") {
                                    var year = result[0].start.getFullYear();
                                    var month = result[0].start.getMonth() + 1;
                                    var day = result[0].start.getDate();

                                    if (month < 10) {
                                        month = "0" + month;
                                    }
                                    if (day < 10) {
                                        day = "0" + day;
                                    }

                                    dateStamp = [year, month, day].join('-');
                                } else {
                                    var year = tahun;
                                    var month = new Date().getMonth() + 1;
                                    var day = new Date().getDate();

                                    if (month < 10) {
                                        month = "0" + month;
                                    }
                                    if (day < 10) {
                                        day = "0" + day;
                                    }
                                    dateStamp = [year, month, day].join('-');
                                }
                            } else {

                                var year = tahun;
                                var month = new Date().getMonth() + 1;
                                var day = new Date().getDate();

                                if (month < 10) {
                                    month = "0" + month;
                                }
                                if (day < 10) {
                                    day = "0" + day;
                                }
                                dateStamp = [year, month+"%%"].join('-');

                            }


                            manager.getRowNumber(table1, table2, dateStamp, buyer)
                                .then(data => {
                                    var result = resultFormatter.ok(apiVersion, 200, data);
                                    response.send(200, result);
                                })
                                .catch(e => {
                                    response.send(500, "gagal");
                                });
                        })
                    }
                }).catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
            })

    });

    return router;
}
module.exports = getRouter;