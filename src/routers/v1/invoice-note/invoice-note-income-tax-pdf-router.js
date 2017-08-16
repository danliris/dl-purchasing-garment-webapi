var Router = require('restify-router').Router;
var db = require("../../../db");
var Manager = require("dl-module").managers.garmentPurchasing.InvoiceNoteManager;
var resultFormatter = require("../../../result-formatter");
const apiVersion = '1.0.0';
var passport = require('../../../passports/jwt-passport');

function getRouter() {
    var router = new Router();
    var handlePdfRequest = function (request, response, next) {
        db.get().then(db => {
            var manager = new Manager(db, request.user);

            var id = request.params.id;
            manager.pdfIncomeTax(id, request.timezoneOffset)
                .then(docBinary => {
                    manager.getSingleById(id, ["incomeTaxInvoiceNo"])
                        .then(doc => {
                            response.writeHead(200, {
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': `attachment; filename=${doc.incomeTaxInvoiceNo}.pdf`,
                                'Content-Length': docBinary.length
                            });
                            response.end(docBinary);
                        })
                        .catch(e => {
                            var error = resultFormatter.fail(apiVersion, 400, e);
                            response.send(400, error);
                        });
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
        })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    };

    router.get('/:id', passport, (request, response, next) => {
        db.get().then(db => {
            if ((request.headers.accept || '').toString().indexOf("application/pdf") >= 0) {
                next();
            }
            else {
                var manager = new Manager(db, request.user);
                var id = request.params.id;
                manager.getSingleById(id)
                    .then(doc => {
                        var result = resultFormatter.ok(apiVersion, 200, doc);
                        response.send(200, result);
                    })
                    .catch(e => {
                        var error = resultFormatter.fail(apiVersion, 400, e);
                        response.send(400, error);
                    });
            }
        })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    }, handlePdfRequest);
    return router;
}

module.exports = getRouter;