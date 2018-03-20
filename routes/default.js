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
var v1PurchaseOrderMonitoringReportRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-report-router');

// PURCHASE ORDER EXTERNAL
var v1PurchaseOrderExternalPostRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-post-router');
var v1PurchaseOrderExternalApproveRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-approve-router');
var v1PurchaseOrderExternalNotApprovedRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-not-approved-router');
var v1PurchaseOrderExternalByUserRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-by-user-router');
var v1PurchaseOrderExternalRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-router');
var v1PurchaseOrderExternalCancelRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-cancel-router');
var v1PurchaseOrderExternalUnpostRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-unpost-router');
var v1PurchaseOrderExternalCloseRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-close-router');
var v1PurchaseOrderExternalBySupplierRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-by-supplier-posted-router');
var v1PurchaseOrderExternalGetBudgetRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-get-budget-router');
var v1PurchaseOrderExternalOverBudgetReportRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-monitoring-report-router');

//ETL
var v1ETLGarmentPurchaseRequestRouter = require('../src/routers/v1/etl/garment-purchase-requests-router');

// DELIVERY ORDER
// var v1DOMonitoringByUserRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-by-user-router');
var v1DOMonitoringRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-router');
var v1DeliveryOrderBySupplierRouter = require('../src/routers/v1/delivery-order/delivery-order-by-supplier-router');
var v1DeliveryOrderNoInvoiceRouter = require('../src/routers/v1/delivery-order/delivery-order-no-invoice-router');
var v1DeliveryOrderByUserRouter = require('../src/routers/v1/delivery-order/delivery-order-by-user-router');
var v1DeliveryOrderRouter = require('../src/routers/v1/delivery-order/delivery-order-router');
var v1DeliveryOrderBasicRouter = require('../src/routers/v1/delivery-order/delivery-order-router-basic');
// CUSTOMS
var v1CustomsRouter = require('../src/routers/v1/customs/customs-router');
var v1MonitoringCustomsRouter = require('../src/routers/v1/customs/customs-monitoring-router');

// INVOICE NOTE
var v1InvoiceNoteVatPdfRouter = require('../src/routers/v1/invoice-note/invoice-note-vat-pdf-router');
var v1InvoiceNoteIncomeTaxPdfRouter = require('../src/routers/v1/invoice-note/invoice-note-income-tax-pdf-router');
var v1InvoiceNoteByUserRouter = require('../src/routers/v1/invoice-note/invoice-note-by-user-router');
var v1InvoiceNoteRouter = require('../src/routers/v1/invoice-note/invoice-note-router');
var v1InvoiceNoteMonitoringRouter = require('../src/routers/v1/invoice-note/invoice-note-monitoring-router');
var v1InvoiceNoteNoInternNoteRouter = require('../src/routers/v1/invoice-note/invoice-note-no-intern-note-router');

// UNIT RECEIPT NOTE
// var v1UnitReceiptNoteMonitoringByUserRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-by-user-router');
// var v1UnitReceiptNoteMonitoringRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-router');
// var v1UnitReceiptWithoutSpbRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-without-spb-router');
var v1UnitReceiptNoteByUserRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-by-user-router');
// var v1UnitPaymentOrderSupplierRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-suplier-unit-router');
var v1UnitReceiptNoteRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-router');

//garment currency
var v1GarmentCurrencyRouter = require('../src/routers/v1/garment-currency/garment-currency-upload-router');
var v1GarmentCurrenciesRouter = require('../src/routers/v1/garment-currency/garment-currency-router');

// INTERN NOTE
var v1InternNoteByUserRouter = require('../src/routers/v1/intern-note/intern-note-by-user-router');
var v1InternNoteRouter = require('../src/routers/v1/intern-note/intern-note-router');
var v1InternNoteMonitoringRouter = require('../src/routers/v1/intern-note/intern-note-monitoring-router');

// PURCHASE CORRECTION
var v1PurchaseQuantityCorrectionByUserRouter = require("../src/routers/v1/purchase-correction/purchase-quantity-correction-by-user-router");
var v1PurchasePriceCorrectionRouter = require('../src/routers/v1/purchase-correction/purchase-price-correction-router');
var v1PurchasePriceCorrectionByUserRouter = require('../src/routers/v1/purchase-correction/purchase-price-correction-by-user-router');
var v1PurchasePriceCorrectionMonitoringRouter = require('../src/routers/v1/purchase-correction/purchase-price-correction-monitoring-router');
var v1PurchaseQuantityCorrectionMonitoringRouter = require('../src/routers/v1/purchase-correction/purchase-quantity-correction-monitoring-router');
var v1PurchasePriceCorrectionReturnNotePphRouter = require('../src/routers/v1/purchase-correction/purchase-price-correction-return-note-pph-router');
var v1PurchasePriceCorrectionReturnNotePpnRouter = require('../src/routers/v1/purchase-correction/purchase-price-correction-return-note-ppn-router');
var v1PurchaseQuantityCorrectionReturnNotePphRouter = require('../src/routers/v1/purchase-correction/purchase-quantity-correction-return-note-pph-router');
var v1PurchaseQuantityCorrectionReturnNotePpnRouter = require('../src/routers/v1/purchase-correction/purchase-quantity-correction-return-note-ppn-router');

module.exports = function (server) {
    //PURCHASE REQUEST
    v1PurchaseRequestByTagsRouter().applyRoutes(server, "/purchase-requests/by-tags");
    v1PurchaseRequestByUserRouter().applyRoutes(server, "/purchase-requests/by-user");
    v1PurchaseRequestMonitoringAllUserRouter().applyRoutes(server, "/purchase-requests/monitoring/all-user");
    v1PurchaseRequestMonitoringRouter().applyRoutes(server, "/purchase-requests/monitoring");
    v1PurchaseRequestRouter().applyRoutes(server, "/purchase-requests");

    //PURCHASE ORDER
    v1PurchaseOrderMonitoringReportRouter().applyRoutes(server, "/purchase-orders/report/monitoring-purchase");
    v1PurchaseOrderByTagsRouter().applyRoutes(server, "/purchase-orders/by-tags");
    v1PurchaseOrderSplitRouter().applyRoutes(server, "/purchase-orders/split");
    // v1POMonitoringByUserRouter().applyRoutes(server,                        "/purchase-orders/monitoring/by-user");
    // v1POMonitoringRouter().applyRoutes(server,                              "/purchase-orders/monitoring");
    // v1PurchaseOrderUnpostedRouter().applyRoutes(server,                     "/purchase-orders/unposted");
    v1PurchaseOrderByUserRouter().applyRoutes(server, "/purchase-orders/by-user");
    // v1ReportPoCategoryPeriodeRouter().applyRoutes(server,                   "/purchase-orders/reports/categories");
    // v1ReportPoUnitPeriodeRouter().applyRoutes(server,                       "/purchase-orders/reports/units");
    // v1ReportPoSubUnitCategoriesPeriodeRouter().applyRoutes(server,          "/purchase-orders/reports/units-categories");
    // v1ReportPoSubUnitPeriodeRouter().applyRoutes(server,                    "/purchase-orders/reports/subUnits");
    v1PurchaseOrderRouter().applyRoutes(server, "/purchase-orders");

    //report
    v1PurchaseOrderReportRouter().applyRoutes(server, "/purchase-orders-report")

    //PURCHASE ORDER EXTERNAL
    v1PurchaseOrderExternalPostRouter().applyRoutes(server, "/purchase-orders/externals/post");
    v1PurchaseOrderExternalApproveRouter().applyRoutes(server, "/purchase-orders/externals/approve");
    v1PurchaseOrderExternalByUserRouter().applyRoutes(server, "/purchase-orders/externals/by-user");
    v1PurchaseOrderExternalCancelRouter().applyRoutes(server, "/purchase-orders/externals/cancel");
    v1PurchaseOrderExternalUnpostRouter().applyRoutes(server, "/purchase-orders/externals/unpost");
    v1PurchaseOrderExternalCloseRouter().applyRoutes(server, "/purchase-orders/externals/close");
    v1PurchaseOrderExternalBySupplierRouter().applyRoutes(server, "/purchase-orders/externals/by-supplier");
    v1PurchaseOrderExternalGetBudgetRouter().applyRoutes(server, "/purchase-orders/externals/get-budget");
    v1PurchaseOrderExternalApproveRouter().applyRoutes(server, "/purchase-orders/externals/approve");
    v1PurchaseOrderExternalNotApprovedRouter().applyRoutes(server, "/purchase-orders/externals/not-approved");
    v1PurchaseOrderExternalOverBudgetReportRouter().applyRoutes(server, "/purchase-orders/externals/report/over-budget");
    v1PurchaseOrderExternalRouter().applyRoutes(server, "/purchase-orders-externals");

    //ETL
    v1ETLGarmentPurchaseRequestRouter().applyRoutes(server, "/etl-garment-purchase-requests");

    //DELIVERY ORDER
    // v1DOMonitoringByUserRouter().applyRoutes(server,                        "/delivery-orders/monitoring/by-user");
    v1DOMonitoringRouter().applyRoutes(server, "/delivery-orders/monitoring");
    v1DeliveryOrderBySupplierRouter().applyRoutes(server, "/delivery-orders/by-supplier");
    v1DeliveryOrderNoInvoiceRouter().applyRoutes(server, "/delivery-orders/no-invoice");
    v1DeliveryOrderByUserRouter().applyRoutes(server, "/delivery-orders/by-user");
    v1DeliveryOrderRouter().applyRoutes(server, "/delivery-orders");
    v1DeliveryOrderBasicRouter().applyRoutes(server,"/basic-delivery-orders")
    // CUSTOMS
    v1MonitoringCustomsRouter().applyRoutes(server, "customs/reports/customs");
    v1CustomsRouter().applyRoutes(server, "customs");

    //INVOICE NOTE
    v1InvoiceNoteIncomeTaxPdfRouter().applyRoutes(server, "/invoice-notes/pdf/income-tax");
    v1InvoiceNoteVatPdfRouter().applyRoutes(server, "/invoice-notes/pdf/vat");
    v1InvoiceNoteByUserRouter().applyRoutes(server, "/invoice-notes/by-user");
    v1InvoiceNoteNoInternNoteRouter().applyRoutes(server, "/invoice-notes/no-intern-note");
    v1InvoiceNoteRouter().applyRoutes(server, "/invoice-notes");
    v1InvoiceNoteMonitoringRouter().applyRoutes(server, "/invoice-notes-monitoring");

    //UNIT RECEIPT NOTE
    // v1UnitReceiptNoteMonitoringByUserRouter().applyRoutes(server, "/unit-receipt-notes/monitoring/by-user");
    // v1UnitReceiptNoteMonitoringRouter().applyRoutes(server, "/unit-receipt-notes/monitoring");
    v1UnitReceiptNoteByUserRouter().applyRoutes(server, "/unit-receipt-notes/by-user");
    // v1UnitPaymentOrderSupplierRouter().applyRoutes(server, "/unit-receipt-notes/by-supplier-unit");
    v1UnitReceiptNoteRouter().applyRoutes(server, "/unit-receipt-notes");


    //garment-currency
    v1GarmentCurrencyRouter().applyRoutes(server, "/garment-currency");
    v1GarmentCurrenciesRouter().applyRoutes(server, "/garment-currencies");


    //INTERN NOTE
    v1InternNoteByUserRouter().applyRoutes(server, "/intern-notes/by-user");
    v1InternNoteRouter().applyRoutes(server, "/intern-notes");
    v1InternNoteMonitoringRouter().applyRoutes(server, "/intern-notes-monitoring");

    //PURCHASE CORRECTION
    v1PurchaseQuantityCorrectionByUserRouter().applyRoutes(server, "/purchase-quantity-correction/by-user");
    v1PurchasePriceCorrectionByUserRouter().applyRoutes(server, "/purchase-price-corrections/by-user");
    v1PurchasePriceCorrectionReturnNotePphRouter().applyRoutes(server, "/purchase-price-corrections/return-note/pph");
    v1PurchasePriceCorrectionReturnNotePpnRouter().applyRoutes(server, "/purchase-price-corrections/return-note/ppn");
    v1PurchaseQuantityCorrectionReturnNotePphRouter().applyRoutes(server, "/purchase-quantity-corrections/return-note/pph");
    v1PurchaseQuantityCorrectionReturnNotePpnRouter().applyRoutes(server, "/purchase-quantity-corrections/return-note/ppn");
    v1PurchasePriceCorrectionRouter().applyRoutes(server, "/purchase-price-corrections");
    v1PurchasePriceCorrectionMonitoringRouter().applyRoutes(server, "/purchase-price-correction/monitoring");
    v1PurchaseQuantityCorrectionMonitoringRouter().applyRoutes(server, "/purchase-quantity-correction/monitoring");

};
