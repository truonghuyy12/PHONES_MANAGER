const Pos = require('../model_mongoose/pos');
const { singleToObject, mulToObject } = require('../util/mongoose');
class ReportController {
    sale(req, res) {
        res.render("pages/sale_report",)
    }

    async invoice(req, res) {
        const data = await Pos.find()
        res.render('pages/invoice/invoice_report', { data: mulToObject(data) })
    }
}

module.exports = new ReportController();
