const EmployeeModel = require('../models/employee.model')
const nodemailer = require('nodemailer');
const session = require('express-session');
const moment = require('moment-timezone');
const vietnamTime = moment.tz(new Date(), 'Asia/Ho_Chi_Minh').format('DD-MM-YYYY HH:mm');
require('dotenv').config

class EmployeeController {
    //GET /home
    employee(req, res) {
        EmployeeModel.getEmployees()
            .then(data =>{
                // res.send(data)
                res.render("pages/employee/listEmployee", {data})

            })
            .catch(error =>{
                res.send(error)
            })
        // res.render("pages/employee/listEmployee")
    }


    // Add employee
    createEmployee(req, res) {
        res.render("pages/employee/createEmployee")
    }
    async lockEmployee(req,res){

        try{
            const id=req.params.id;
            await EmployeeModel.findByEmployeeId(id)
            .then(data => {
                if (data.length > 0) {
                        if(data[0].status=='active'){
                            data[0].status='inactive'
                        }else{
                            data[0].status='active'
                        }
                        EmployeeModel.updateEmployee(data[0])
                            .then(data2 => {
                                res.send({message:"Đã sửa"})
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).send({ message: "Lỗi server" });
                            });

                } else {
                    res.send({ message: "Không tìm thấy" });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: "Lỗi server" });
            });
        }catch{ err => {
                console.log(err);
                res.status(500).send({ message: "Lỗi server" });
            }
        }
    }
    async handleCreateEmployee(req, res) {
        try {
            // Data from form submit
            const { full_name, phone_number, email_address, password } = req.body;
            const employee = {
                fullname: full_name,
                phonenumber: phone_number,
                email: email_address,
                status: "active", // Trạng thái ban đầu là "inactive"
                admin: false,
                login: {
                    token: Math.random().toString(36).slice(-6),
                    expiration: Date.now(),
                },
                hire_date: vietnamTime,
                username: email_address.split('@')[0],
                password: password, // Lưu mật khẩu từ form
                picture: '',
            };
    
            // Create token login
            const loginLink = `${process.env.DOMAIN}/login/confirm?token=${employee.login.token}`;
            // Save to database
            EmployeeModel.createEmployee(employee)
                .then(async (data) => {
                    // Config nodemailer
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL, // your Gmail address
                            pass: process.env.PASSWORD_EMAIL, // your Gmail app password
                        },
                    });
    
                    // Send email
                    const info = await transporter.sendMail({
                        from: process.env.EMAIL,
                        to: email_address,
                        subject: 'Account Created',
                        text: `Dear ${full_name},\n\nYour account has been created. Your password is: ${password}\n\nPlease click on the following link to log in: ${loginLink}`,
                    });
    
                    // Thay đổi trạng thái thành "active" sau khi xác nhận
                    // Cập nhật trạng thái trong cơ sở dữ liệu tại đây
    
                    // Send result
                    res.status(200).json({
                        success: true,
                        message: 'Account created successfully. Check your email for the login link.',
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: '',
                    });
                    console.log(error);
                });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({
                success: false,
                message: 'Error sending email. Please try again later.',
            });
        }
    }
    


}

module.exports = new EmployeeController();
