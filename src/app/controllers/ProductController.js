const Product = require('../model_mongoose/product')
const { singleToObject, mulToObject } = require('../util/mongoose');
const ObjectId = require('mongodb').ObjectId;



const getAddProduct = (req, res) => {
    res.render('pages/product/add_product');
}

const getEditProduct = async (req, res) => {
    const productId = req.params.id
    const data = await Product.findById(productId)
    res.render('pages/product/edit_product', { data: singleToObject(data) })
}

const getProducts = async (req, res) => {
    try {
        const data = await Product.find()
        console.log('data ne: ', data);
        res.render('pages/product/productlist', { data: mulToObject(data) })
    } catch (error) {
        console.log(error)
    }
}

const addProduct = async (req, res) => {
    try {
        const {
            product_name,
            series,
            inventory_quantity,
            link_product,
            barcode,
            import_price,
            retail_price,
            colors,
            link_image } = req.body

        const product = new Product({
            product_name,
            series,
            inventory_quantity,
            link_product,
            barcode,
            import_price,
            retail_price,
            colors,
            link_image
        })
        await product.save()
        res.render('pages/product/add_product')
    } catch (error) {
        console.log(error)
    }
}

const editProduct = async (req, res) => {
    try {
        const {
            product_name,
            series,
            inventory_quantity,
            link_product,
            barcode,
            import_price,
            retail_price,
            colors,
            link_image
        } = req.body

        const productId = req.params.id; // Lấy id của sản phẩm cần chỉnh sửa từ request params

        await Product.findByIdAndUpdate(
            productId,
            {
                product_name,
                series,
                inventory_quantity,
                link_product,
                barcode,
                import_price,
                retail_price,
                colors,
                link_image
            },
            { new: true } // Tùy chọn để trả về sản phẩm đã được chỉnh sửa
        );
        res.redirect('/productlist')
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    const filter = { _id: new ObjectId(productId) }
    await Product.deleteOne(filter)
    res.redirect('/productlist')
}

const detailProduct = async (req, res) => {
    const productId = req.params.id
    const data = await Product.findById(productId)
    res.render('pages/product/detail_product', { data: singleToObject(data) })
}





module.exports = {
    addProduct,
    editProduct,
    getProducts,
    getAddProduct,
    getEditProduct,
    deleteProduct,
    detailProduct
};