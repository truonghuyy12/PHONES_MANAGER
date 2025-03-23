const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const vietnamTime = moment.tz(new Date(), 'Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm');
const customerSchema = new Schema({
  customer_name: {type: String, default: "Name of Customer"},
  customer_phone: String,
  customer_email: String,
  createdAt:{type: String,default: vietnamTime}
});

const Customer = mongoose.model('Customer', customerSchema ,'customers');

module.exports = Customer;
