const CustomerModel = require('../models/customer.model')
const EmployeeModel = require('../models/employee.model')
const ProductModel = require('../models/product.model')
const Customer = require('../model_mongoose/customer');
const Employee = require('../model_mongoose/employee');
const Product = require('../model_mongoose/product');
const { render } = require('node-sass');
const { mulToObject } = require('../util/mongoose');
const { singleToObject } = require('../util/mongoose');

class AdminController {

        //GET 3 tables
        async adminCustomer(req, res) {
            try {
                const customer = await Customer.find();
                const customers=mulToObject(customer);
                res.render("pages/admin/admin_customer",{customers});
            } catch (error) {
                res.send("Render Admin Error");
            }
        }
        async adminEmployee(req, res) {
          try {
              const employee = await Employee.find();
              const employees=mulToObject(employee);
              res.render("pages/admin/admin_employee",{employees});
          } catch (error) {
              res.send("Render Admin Error");
          }
      }
        async adminInvoice(req, res) {
          try {
              const product = await Product.find();
              const products=mulToObject(product);
              res.render("pages/admin/admin_invoice",{products});
          } catch (error) {
              res.send("Render Admin Error");
          }
      }
      async adminProduct(req, res) {
        try {
            const product = await Product.find();
            const products=mulToObject(product);
            res.render("pages/admin/admin_product",{products});
        } catch (error) {
            res.send("Render Admin Error");
        }
      }

      
    //Create an Employee
    async addEmployee(req, res, next) {
        try {
            res.render('pages/employee/employee_add');
            } catch (error) {
            res.status(500).json(err);
            }
    }

    //Delete an Employee
    async deleteEmployee(req, res, next) {
        
    }

    //Create a Customer
    async addCustomer(req, res) {
        try {
        res.render('pages/customer/customer_add');
        } catch (error) {
        res.status(500).json(err);
        }
    }

    // Store a Customer
    storeCustomer(req, res) {
        try {
            console.log(req.body)
            const customer = new Customer(req.body);
            customer.save();
            res.redirect('/admin_customer');
          } catch (error) {
            res.status(500).json(err);
          }
    }

    // Get detail customer
    async getDetailCustomer(req, res) {
        try {
          const customer = await Customer.findOne({ customer_name: req.params.customer_name });
          res.render('pages/customer/customer_detail', { data: singleToObject(customer) });
        } catch {
          res.status(500).json(err);
        }
      }

      // Update a Customer
      async updateCustomer(req, res, next) {
        try{
          const customer = await Customer.findById(req.params.id)
          res.render('pages/customer/customer_update', {customer: singleToObject(customer)});
        }catch {
          res.status(500).json(err);
        }
      }  

      //Update OneCustomer
      async updateOneCustomer(req, res, next) {
        try{
          console.log(req.params.id)
          console.log(req.body)
          await Customer.updateOne({ _id: req.params.id }, req.body)
          res.redirect('/admin_customer');
        }catch{
          res.status(500).json(err);
        }
      }
      
      //Delete Customer
      async deleteCustomer(req, res, next) {
        try{
          await Customer.deleteOne({_id: req.params.id})
          res.redirect('/admin_customer');
        }catch{
          res.status(500).json(err);
        }
      } 
      //GET search Customer
      async searchCustomer(req, res) {
        try {
            console.log(req.query.customer_search)
            const customer = await Customer.findOne({customer_name: req.query.customer_search});
            console.log(customer);
            const employee = await Employee.find();
            const product = await Product.find();
            const customers =customer;
            const employees=mulToObject(employee);
            const products=mulToObject(product);
            res.render("pages/admin/admin_customer", { customers, employees, products });
          } catch (error) {
            res.send("Render Admin Error");
        }
      } 
}

module.exports = new AdminController();
