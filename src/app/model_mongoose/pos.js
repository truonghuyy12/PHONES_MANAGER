const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const vietnamTime = moment.tz(new Date(), 'Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm');
const customerSchema = new Schema({
  customer_name: String,
  customer_phone: String,
  customer_bill: { type: Array, default: [] },
  total: Number,
  createdAt: { type: String, default: vietnamTime }
});

const Pos = mongoose.model('bills', customerSchema);

module.exports = Pos;