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
        request.connection.setTimeout(120 * 60000);

        var user = request.user;
        var data = request.body;

        var tables = data.tables.split("&");
        var o = [data.date.trim()];
        var table1 = tables[0].trim();
        var table2 = tables[1].trim();
        var date = o[0];

        Promise.all([db, sqlConnect])
            .then((result) => {
                var db = result[0];
                var sql = result[1];
                db.get().then((db) => {
                    var manager = new Manager(db, {
                        username: "unit-test"
                    }, sql);
                    manager.run(date, table1, table2)
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

    return router;
}
module.exports = getRouter;