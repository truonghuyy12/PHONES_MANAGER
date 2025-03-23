const session = require('express-session');
const cookieParser = require('cookie-parser');

const homeRouter = require('./home');
const productsRouter = require('./productlist');
const posRouter = require('./pos');
const loginRouter = require('./login');
const invoiceRouter = require('./invoice');
const invoiceReportRouter = require('./invoice_report');
const customerRouter = require('./customer');
const employeeRouter = require('./employee');
const adminCustomerRouter = require('./admin_customer');
const adminEmployeeRouter = require('./admin_employee');
const adminInvoiceRouter = require('./admin_invoice');
const adminProductRouter = require('./admin_product');
const reportRouter = require('./report');
const {checkLogin, logout, checkAdmin} = require('../middlewares/authMiddleware')

function route(app) {
    app.use('/productlist', productsRouter);
    app.use('/pos',posRouter);
    app.use('/invoice_report',invoiceReportRouter);
    app.use('/login' ,loginRouter);
    app.use('/invoice',invoiceRouter);
    app.use('/customer',customerRouter);
    app.use('/employee',employeeRouter);
    app.use('/sale_report',reportRouter);
    app.use('/admin_employee', adminEmployeeRouter);
    app.use('/admin_customer', adminCustomerRouter);
    app.use('/admin_invoice', adminInvoiceRouter);
    app.use('/admin_product', adminProductRouter);
    app.get('/logout', logout);
    app.use('/', homeRouter);
}

module.exports = route;
