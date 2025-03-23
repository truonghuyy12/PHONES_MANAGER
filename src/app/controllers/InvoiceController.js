const mongoose = require('mongoose');
const ProductModel = require('../models/product.model')
const { singleToObject, mulToObject } = require('../util/mongoose');
const Product =require('../model_mongoose/product')
class InvoiceController {
    //GET /home
    invoice(req, res) {
        Product.find()
        .then(data =>{
            // res.send(data)
            res.render("pages/invoice/invoice", {data:mulToObject(data)})
            
        })
        .catch(error =>{

        })
    }
    async searchProduct(req,res){
        const searchTerm = req.body.searchTerm; // Từ khóa tìm kiếm từ form
    if (searchTerm.match(/^[0-9a-fA-F]{24}$/)) {
        await Product.find({_id:searchTerm})
        .then(foundProduct => {
            if (foundProduct.length > 0) {
                res.send(foundProduct);
            } else {
                res.send({message:"Không tìm thấy"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message:"Lỗi server"});
        });
    } else{
        await Product.find({product_name:{ $regex:searchTerm,$options:'i'}})
        .then(foundProduct => {
            if (foundProduct.length > 0) {
                console.log(foundProduct)
                res.send(foundProduct);
            }else{
                res.send({message:"Không tìm thấy"});
            }
        })

        .catch(err => {
            console.log(err);
        });
  }
     }
}

module.exports = new InvoiceController();
