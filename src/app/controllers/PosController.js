const { trusted } = require('mongoose');
const Pos = require('../model_mongoose/pos');
const Product = require('../model_mongoose/product');
const { mulToObject, singleToObject } = require('../util/mongoose');
const PDFDocument = require('pdfkit')


class PosController {

  async printBill(req, res) {

    try {
      const { itemlist, customerName, sdt, total } = req.body;
      var array = []
      for (let index = 0; index < itemlist.length; index++) {
        itemlist[index].series = itemlist[index].series.trim()
        itemlist[index].retailPrice = itemlist[index].retailPrice.trim()
        array.push(itemlist[index])
      }
      var customer_name = customerName;
      var customer_phone = sdt;
      var customer_bill = array;
      const pos = new Pos({
        customer_name,
        customer_phone,
        customer_bill,
        total,
      })
      await pos.save()
      customer_bill.forEach(async (item) => {
        const { series, quantity } = item;

        // Tìm sản phẩm trong collection "product" dựa trên series
        const product = await Product.findOne({ "series":series });
        if (product) {
          // Cập nhật số lượng inventory_quantity của sản phẩm
          product.inventory_quantity -= quantity;
          // Lưu thay đổi vào database
          await product.save();
        }
      })
      res.send({message:"Đã cập nhật số lượng sản phẩm"});
    } catch (error) {

    }
  }
  //GET /pos
  async pos(req, res) {
    try {
      const products = await Product.find();
      res.render('pages/pos', { data: mulToObject(products) });
    } catch {
      res.send('Error');
    }
  }

  //more
  show(req, res) {
    res.send('More in pos!!!')
  }
}

module.exports = new PosController();