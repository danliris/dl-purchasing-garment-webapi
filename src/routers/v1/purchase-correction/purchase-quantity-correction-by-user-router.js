const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.garmentPurchasing.PurchaseQuantityCorrectionManager;
var JwtRouterFactory = require("../../jwt-router-factory");
var db = require("../../../db");
var resultFormatter = require("../../../result-formatter");

var handlePdfRequest = function (request, response, next) {
    var user = request.user;
    var id = request.params.id;
    var timezoneOffset = request.timezoneOffset;
    var manager;
    db.get()
        .then((db) => {
            manager = new Manager(db, user);
            return manager.getSingleByIdOrDefault(id);
        })
        .then((purchaseQuantityCorrection) => {
            var filename = purchaseQuantityCorrection.no;
            manager.getPdf(purchaseQuantityCorrection, timezoneOffset)
                .then((purchaseQuantityCorrectionBinary) => {
                    response.writeHead(200, {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": `attachment; filename=${filename}.pdf`,
                        "Content-Length": purchaseQuantityCorrectionBinary.length
                    });
                    response.end(purchaseQuantityCorrectionBinary);
                })
                .catch((e) => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                })
        })
}

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_createdDate": -1
        },
        defaultFilter: (request, response, next) => {
            return {
                "_createdBy": request.user.username
            };
        },
    });

    var route = router.routes["get"].find((route) => route.options.path === "/:id");
    var originalHandler = route.handlers[route.handlers.length - 1];
    route.handlers[route.handlers.length - 1] = function (request, response, next) {
        var isPDFRequest = (request.headers.accept || "").toString().indexOf("application/pdf") >= 0;
        if (isPDFRequest) {
            next()
        }
        else {
            originalHandler(request, response, next);
        }
    };

    route.handlers.push(handlePdfRequest)
    return router;
}
module.exports = getRouter;