const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeechema = new Schema({
  name: {type: String, default: "Name of Employee"},
  phone: String,
  email: String,
  createdAt:{type: String},
  status : String,
  avatar:{type: String, default:'https://musicart.xboxlive.com/7/4d4d6500-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080'}
});

const Employee = mongoose.model('Employee', employeechema,'employees');

module.exports = Employee;
