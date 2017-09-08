// PURCHASE REQUEST
var v1PurchaseRequestByTagsRouter = require('../src/routers/v1/purchase-request/purchase-request-by-tags-router');
var v1PurchaseRequestByUserRouter = require('../src/routers/v1/purchase-request/purchase-request-by-user-router');
var v1PurchaseRequestMonitoringRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-router');
var v1PurchaseRequestMonitoringAllUserRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-all-user-router');
var v1PurchaseRequestRouter = require('../src/routers/v1/purchase-request/purchase-request-router');

// PURCHASE ORDER
var v1PurchaseOrderByTagsRouter = require('../src/routers/v1/purchase-order/purchase-order-by-tags-router');
var v1PurchaseOrderSplitRouter = require('../src/routers/v1/purchase-order/purchase-order-split-router');
// var v1POMonitoringByUserRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-by-user-router');
// var v1POMonitoringRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-router');
// var v1POMonitoringPriceRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-price-router');
// var v1PurchaseOrderUnpostedRouter = require('../src/routers/v1/purchase-order/purchase-order-un-posted-router');
var v1PurchaseOrderByUserRouter = require('../src/routers/v1/purchase-order/purchase-order-by-user-router');
// var v1ReportPoCategoryPeriodeRouter = require('../src/routers/v1/purchase-order/reports/purchase-order-report-category-router');
// var v1ReportPoUnitPeriodeRouter = require('../src/routers/v1/purchase-order/reports/purchase-order-report-unit-router');
// var v1ReportPoSubUnitCategoriesPeriodeRouter = require('../src/routers/v1/purchase-order/reports/purchase-order-report-unit-category-router');
// var v1ReportPoSubUnitPeriodeRouter = require('../src/routers/v1/purchase-order/reports/purchase-order-report-sub-unit-router');
var v1PurchaseOrderRouter = require('../src/routers/v1/purchase-order/purchase-order-router');
var v1PurchaseOrderReportRouter = require('../src/routers/v1/report/purchase-order-report-router');

// PURCHASE ORDER EXTERNAL
var v1PurchaseOrderExternalPostRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-post-router');
var v1PurchaseOrderExternalByUserRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-by-user-router');
var v1PurchaseOrderExternalRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-router');
var v1PurchaseOrderExternalCancelRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-cancel-router');
var v1PurchaseOrderExternalUnpostRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-unpost-router');
var v1PurchaseOrderExternalCloseRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-close-router');
var v1PurchaseOrderExternalBySupplierRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-by-supplier-posted-router');

//ETL
var v1ETLGarmentPurchaseRequestRouter = require('../src/routers/v1/etl/garment-purchase-requests-router');

// DELIVERY ORDER
// var v1DOMonitoringByUserRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-by-user-router');
var v1DOMonitoringRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-router');
var v1DeliveryOrderBySupplierRouter = require('../src/routers/v1/delivery-order/delivery-order-by-supplier-router');
var v1DeliveryOrderNoInvoiceRouter = require('../src/routers/v1/delivery-order/delivery-order-no-invoice-router');
var v1DeliveryOrderByUserRouter = require('../src/routers/v1/delivery-order/delivery-order-by-user-router');
var v1DeliveryOrderRouter = require('../src/routers/v1/delivery-order/delivery-order-router');

// CUSTOMS
var v1CustomsRouter = require('../src/routers/v1/customs/customs-router');
var v1MonitoringCustomsRouter = require('../src/routers/v1/customs/customs-monitoring-router');

// INVOICE NOTE
var v1InvoiceNoteVatPdfRouter = require('../src/routers/v1/invoice-note/invoice-note-vat-pdf-router');
var v1InvoiceNoteIncomeTaxPdfRouter = require('../src/routers/v1/invoice-note/invoice-note-income-tax-pdf-router');
var v1InvoiceNoteByUserRouter = require('../src/routers/v1/invoice-note/invoice-note-by-user-router');
var v1InvoiceNoteRouter = require('../src/routers/v1/invoice-note/invoice-note-router');

// UNIT RECEIPT NOTE
// var v1UnitReceiptNoteMonitoringByUserRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-by-user-router');
// var v1UnitReceiptNoteMonitoringRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-router');
// var v1UnitReceiptWithoutSpbRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-without-spb-router');
var v1UnitReceiptNoteByUserRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-by-user-router');
// var v1UnitPaymentOrderSupplierRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-suplier-unit-router');
var v1UnitReceiptNoteRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-router');

module.exports = function (server) {
    //PURCHASE REQUEST
    v1PurchaseRequestByTagsRouter().applyRoutes(server, "/v1/purchase-requests/by-tags");
    v1PurchaseRequestByUserRouter().applyRoutes(server, "/v1/purchase-requests/by-user");
    v1PurchaseRequestMonitoringAllUserRouter().applyRoutes(server, "/v1/purchase-requests/monitoring/all-user");
    v1PurchaseRequestMonitoringRouter().applyRoutes(server, "/v1/purchase-requests/monitoring");
    v1PurchaseRequestRouter().applyRoutes(server, "/v1/purchase-requests");

    //PURCHASE ORDER
    v1PurchaseOrderByTagsRouter().applyRoutes(server, "/v1/purchase-orders/by-tags");
    v1PurchaseOrderSplitRouter().applyRoutes(server, "/v1/purchase-orders/split");
    // v1POMonitoringByUserRouter().applyRoutes(server,                        "/v1/purchase-orders/monitoring/by-user");
    // v1POMonitoringRouter().applyRoutes(server,                              "/v1/purchase-orders/monitoring");
    // v1POMonitoringPriceRouter().applyRoutes(server,                         "/v1/purchase-orders/price");
    // v1PurchaseOrderUnpostedRouter().applyRoutes(server,                     "/v1/purchase-orders/unposted");
    v1PurchaseOrderByUserRouter().applyRoutes(server, "/v1/purchase-orders/by-user");
    // v1ReportPoCategoryPeriodeRouter().applyRoutes(server,                   "/v1/purchase-orders/reports/categories");
    // v1ReportPoUnitPeriodeRouter().applyRoutes(server,                       "/v1/purchase-orders/reports/units");
    // v1ReportPoSubUnitCategoriesPeriodeRouter().applyRoutes(server,          "/v1/purchase-orders/reports/units-categories");
    // v1ReportPoSubUnitPeriodeRouter().applyRoutes(server,                    "/v1/purchase-orders/reports/subUnits");
    v1PurchaseOrderRouter().applyRoutes(server, "/v1/purchase-orders");

    //report
    v1PurchaseOrderReportRouter().applyRoutes(server, "/v1/purchase-orders-report");

    //PURCHASE ORDER EXTERNAL
    v1PurchaseOrderExternalPostRouter().applyRoutes(server, "/purchase-orders/externals/post");
    v1PurchaseOrderExternalByUserRouter().applyRoutes(server, "/purchase-orders/externals/by-user");
    v1PurchaseOrderExternalCancelRouter().applyRoutes(server, "/purchase-orders/externals/cancel");
    v1PurchaseOrderExternalUnpostRouter().applyRoutes(server, "/purchase-orders/externals/unpost");
    v1PurchaseOrderExternalCloseRouter().applyRoutes(server, "/purchase-orders/externals/close");
    v1PurchaseOrderExternalBySupplierRouter().applyRoutes(server, "/purchase-orders/externals/by-supplier");
    v1PurchaseOrderExternalRouter().applyRoutes(server, "/purchase-orders/externals");

    //ETL
    v1ETLGarmentPurchaseRequestRouter().applyRoutes(server, "/v1/etl-garment-purchase-requests");

    //DELIVERY ORDER
    //v1DOMonitoringByUserRouter().applyRoutes(server,                        "/v1/delivery-orders/monitoring/by-user");
    v1DOMonitoringRouter().applyRoutes(server,    "/v1/delivery-orders/monitoring");
    v1DeliveryOrderBySupplierRouter().applyRoutes(server, "/v1/delivery-orders/by-supplier");
    v1DeliveryOrderNoInvoiceRouter().applyRoutes(server, "/v1/delivery-orders/no-invoice");
    v1DeliveryOrderByUserRouter().applyRoutes(server, "/v1/delivery-orders/by-user");
    v1DeliveryOrderRouter().applyRoutes(server, "/v1/delivery-orders");

    //CUSTOMS
    v1MonitoringCustomsRouter().applyRoutes(server, "/v1/customs/reports");
    v1CustomsRouter().applyRoutes(server, "/v1/customs");

    //INVOICE NOTE
    v1InvoiceNoteIncomeTaxPdfRouter().applyRoutes(server, "/v1/invoice-notes/pdf/income-tax");
    v1InvoiceNoteVatPdfRouter().applyRoutes(server, "/v1/invoice-notes/pdf/vat");
    v1InvoiceNoteByUserRouter().applyRoutes(server, "/v1/invoice-notes/by-user");
    v1InvoiceNoteRouter().applyRoutes(server, "/v1/invoice-notes");

    //UNIT RECEIPT NOTE
    // v1UnitReceiptNoteMonitoringByUserRouter().applyRoutes(server, "/v1/unit-receipt-notes/monitoring/by-user");
    // v1UnitReceiptNoteMonitoringRouter().applyRoutes(server, "/v1/unit-receipt-notes/monitoring");
    // v1UnitReceiptWithoutSpbRouter().applyRoutes(server, "/v1/unit-receipt-without-spb");
    v1UnitReceiptNoteByUserRouter().applyRoutes(server, "/v1/unit-receipt-notes/by-user");
    // v1UnitPaymentOrderSupplierRouter().applyRoutes(server, "/v1/unit-receipt-notes/by-supplier-unit");
    v1UnitReceiptNoteRouter().applyRoutes(server, "/v1/unit-receipt-notes");

};