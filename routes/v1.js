// PURCHASE REQUEST
var v1PurchaseRequestByTagsRouter = require('../src/routers/v1/purchase-request/purchase-request-by-tags-router');
var v1PurchaseRequestByUserRouter = require('../src/routers/v1/purchase-request/purchase-request-by-user-router');
var v1PurchaseRequestMonitoringRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-router');
var v1PurchaseRequestMonitoringAllUserRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-all-user-router');
var v1PurchaseRequestRouter = require('../src/routers/v1/purchase-request/purchase-request-router');

// PURCHASE ORDER
var v1PurchaseOrderByTagsRouter = require('../src/routers/v1/purchase-order/purchase-order-by-tags-router');
var v1PurchaseOrderSplitRouter = require('../src/routers/v1/purchase-order/purchase-order-split-router');
var v1PurchaseOrderByUserRouter = require('../src/routers/v1/purchase-order/purchase-order-by-user-router');
var v1PurchaseOrderRouter = require('../src/routers/v1/purchase-order/purchase-order-router');
var v1PurchaseOrderReportRouter = require('../src/routers/v1/report/purchase-order-report-router');
var v1PurchaseOrderMonitoringReportRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-report-router');
var v1PurchaseOrderMonitoringAllUserRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-report-all-user-router');

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
var v1DOMonitoringRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-router');
var v1DOMonitoringAllRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-all-router');
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
var v1InvoiceNoteMonitoringRouter = require('../src/routers/v1/invoice-note/invoice-note-monitoring-router');
var v1InvoiceNoteNoInternNoteRouter = require('../src/routers/v1/invoice-note/invoice-note-no-intern-note-router');

// UNIT RECEIPT NOTE
var v1UnitReceiptNoteMonitoringRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-router');
var v1UnitReceiptNoteByUserRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-by-user-router');
var v1UnitReceiptNoteRouter = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-router');

//garment-currency
var v1GarmentCurrency = require('../src/routers/v1/garment-currency/garment-currency-upload-router');
var v1GarmentCurrencies = require('../src/routers/v1/garment-currency/garment-currency-router');

// INTERN NOTE
var v1InternNoteByUserRouter = require('../src/routers/v1/intern-note/intern-note-by-user-router');
var v1InternNoteRouter = require('../src/routers/v1/intern-note/intern-note-router');
var v1InternNoteMonitoringRouter = require('../src/routers/v1/intern-note/intern-note-monitoring-router');
var v1InternNoteMonitoringAllRouter = require('../src/routers/v1/intern-note/intern-note-monitoring-all-router');

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

// GENERATE DATA
var v1BudgetDealPurchaseOrderExternal = require('../src/routers/v1/generating-data/generating-data-purchase-order-external-router');
var v1BudgetDealDeliveryOrder = require('../src/routers/v1/generating-data/generating-data-delivery-order-router');
var v1BudgetDealCustoms = require('../src/routers/v1/generating-data/generating-data-customs-router');
var v1BudgetDealInternNote = require('../src/routers/v1/generating-data/generating-data-intern-note-router');
var v1BudgetDealInvoice = require('../src/routers/v1/generating-data/generating-data-invoice-router');
var v1BudgetDealPriceCorrectionNote = require('../src/routers/v1/generating-data/generating-data-correction-note-router');
var v1BudgetDealQuantityCorrectionNote = require('../src/routers/v1/generating-data/generating-data-quantity-correction-note-router');
var v1BudgetDealUnitReceiptNote = require('../src/routers/v1/generating-data/generating-data-unit-receipt-note-router');

module.exports = function (server) {
    //PURCHASE REQUEST
    v1PurchaseRequestByTagsRouter().applyRoutes(server, "/v1/purchase-requests/by-tags");
    v1PurchaseRequestByUserRouter().applyRoutes(server, "/v1/purchase-requests/by-user");
    v1PurchaseRequestMonitoringAllUserRouter().applyRoutes(server, "/v1/purchase-requests/monitoring/all-user");
    v1PurchaseRequestMonitoringRouter().applyRoutes(server, "/v1/purchase-requests/monitoring");
    v1PurchaseRequestRouter().applyRoutes(server, "/v1/purchase-requests");

    //PURCHASE ORDER
    v1PurchaseOrderMonitoringReportRouter().applyRoutes(server, "/v1/purchase-orders/report/monitoring-purchase");
    v1PurchaseOrderMonitoringAllUserRouter().applyRoutes(server, "/v1/purchase-orders/purchase-order-monitoring-report-all-user-router");
    v1PurchaseOrderByTagsRouter().applyRoutes(server, "/v1/purchase-orders/by-tags");
    v1PurchaseOrderSplitRouter().applyRoutes(server, "/v1/purchase-orders/split");
    v1PurchaseOrderByUserRouter().applyRoutes(server, "/v1/purchase-orders/by-user");
    v1PurchaseOrderRouter().applyRoutes(server, "/v1/purchase-orders");

    //report
    v1PurchaseOrderReportRouter().applyRoutes(server, "/v1/purchase-orders-report");

    //PURCHASE ORDER EXTERNAL
    v1PurchaseOrderExternalPostRouter().applyRoutes(server, "/v1/purchase-orders/externals/post");
    v1PurchaseOrderExternalByUserRouter().applyRoutes(server, "/v1/purchase-orders/externals/by-user");
    v1PurchaseOrderExternalCancelRouter().applyRoutes(server, "/v1/purchase-orders/externals/cancel");
    v1PurchaseOrderExternalUnpostRouter().applyRoutes(server, "/v1/purchase-orders/externals/unpost");
    v1PurchaseOrderExternalCloseRouter().applyRoutes(server, "/v1/purchase-orders/externals/close");
    v1PurchaseOrderExternalBySupplierRouter().applyRoutes(server, "/v1/purchase-orders/externals/by-supplier");
    v1PurchaseOrderExternalGetBudgetRouter().applyRoutes(server, "/v1/purchase-orders/externals/get-budget");
    v1PurchaseOrderExternalApproveRouter().applyRoutes(server, "/v1/purchase-orders/externals/approve");
    v1PurchaseOrderExternalNotApprovedRouter().applyRoutes(server, "/v1/purchase-orders/externals/not-approved");
    v1PurchaseOrderExternalOverBudgetReportRouter().applyRoutes(server, "/v1/purchase-orders/externals/report/over-budget");
    v1PurchaseOrderExternalRouter().applyRoutes(server, "/v1/purchase-orders-externals");

    //ETL
    v1ETLGarmentPurchaseRequestRouter().applyRoutes(server, "/v1/etl-garment-purchase-requests");

    //DELIVERY ORDER
    //v1DOMonitoringByUserRouter().applyRoutes(server,                        "/v1/delivery-orders/monitoring/by-user");

    v1DOMonitoringRouter().applyRoutes(server,    "/v1/delivery-orders/monitoring");
    v1DOMonitoringAllRouter().applyRoutes(server,    "/v1/delivery-orders/delivery-order-monitoring-all-router");
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
    v1InvoiceNoteNoInternNoteRouter().applyRoutes(server, "/v1/invoice-notes/no-intern-note");
    v1InvoiceNoteRouter().applyRoutes(server, "/v1/invoice-notes");
    v1InvoiceNoteMonitoringRouter().applyRoutes(server, "/v1/invoice-notes-monitoring");

    //UNIT RECEIPT NOTE
    // v1UnitReceiptNoteMonitoringByUserRouter().applyRoutes(server, "/v1/unit-receipt-notes/monitoring/by-user");
    v1UnitReceiptNoteMonitoringRouter().applyRoutes(server, "/v1/unit-receipt-notes/monitoring");
    // v1UnitReceiptWithoutSpbRouter().applyRoutes(server, "/v1/unit-receipt-without-spb");
    v1UnitReceiptNoteByUserRouter().applyRoutes(server, "/v1/unit-receipt-notes/by-user");
    // v1UnitPaymentOrderSupplierRouter().applyRoutes(server, "/v1/unit-receipt-notes/by-supplier-unit");
    v1UnitReceiptNoteRouter().applyRoutes(server, "/v1/unit-receipt-notes");


    //garment currency
    v1GarmentCurrency().applyRoutes(server, "/v1/garment-currency");
    v1GarmentCurrencies().applyRoutes(server, "/v1/garment-currencies");

    //INTERN NOTE
    v1InternNoteByUserRouter().applyRoutes(server, "/v1/intern-notes/by-user");
    v1InternNoteRouter().applyRoutes(server, "/v1/intern-notes");
    v1InternNoteMonitoringRouter().applyRoutes(server, "/v1/intern-notes-monitoring");
    v1InternNoteMonitoringAllRouter().applyRoutes(server, "/v1/intern-note-monitoring-all-router");

    //PURCHASE CORRECTION
    v1PurchaseQuantityCorrectionByUserRouter().applyRoutes(server, "/v1/purchase-quantity-correction/by-user");
    v1PurchasePriceCorrectionByUserRouter().applyRoutes(server, "/v1/purchase-price-corrections/by-user");
    v1PurchasePriceCorrectionReturnNotePphRouter().applyRoutes(server, "/v1/purchase-price-corrections/return-note/pph");
    v1PurchasePriceCorrectionReturnNotePpnRouter().applyRoutes(server, "/v1/purchase-price-corrections/return-note/ppn");
    v1PurchaseQuantityCorrectionReturnNotePphRouter().applyRoutes(server, "/v1/purchase-quantity-corrections/return-note/pph");
    v1PurchaseQuantityCorrectionReturnNotePpnRouter().applyRoutes(server, "/v1/purchase-quantity-corrections/return-note/ppn");
    v1PurchasePriceCorrectionRouter().applyRoutes(server, "/v1/purchase-price-corrections");
    v1PurchasePriceCorrectionMonitoringRouter().applyRoutes(server, "/v1/purchase-price-correction/monitoring");
    v1PurchaseQuantityCorrectionMonitoringRouter().applyRoutes(server, "/v1/purchase-quantity-correction/monitoring");

   //GENERATE DATA
    v1BudgetDealPurchaseOrderExternal().applyRoutes(server, "/v1/generating-data/purchase-order-external");
    v1BudgetDealDeliveryOrder().applyRoutes(server, "/v1/generating-data/delivery-order");
    v1BudgetDealCustoms().applyRoutes(server, "/v1/generating-data/customs");
    v1BudgetDealInternNote().applyRoutes(server, "/v1/generating-data/intern-note");
    v1BudgetDealInvoice().applyRoutes(server, "/v1/generating-data/invoice");
    v1BudgetDealPriceCorrectionNote().applyRoutes(server, "/v1/generating-data/correction-note");
    v1BudgetDealQuantityCorrectionNote().applyRoutes(server, "/v1/generating-data/quantity-correction-note");
    v1BudgetDealUnitReceiptNote().applyRoutes(server, "/v1/generating-data/unit-receipt-note");

};