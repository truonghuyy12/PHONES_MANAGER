require('dotenv').config();
const Employee = require('../model_mongoose/employee')
const EmployeeModel = require('../models/employee.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');


class LoginController {
    //GET /home
    login(req, res) {
        const error = req.query.error; // Get the error from the query parameters
        res.render("pages/login", { layout: 'sub', error })
    }
    getConfirmLogin(req, res) {
        let token = req.query.token
        if (token) {
            res.render("pages/employee/confirmEmployee", { token })
        } else {
            res.render("pages/404")
        }
    }
    async confirmLogin(req, res) {
        try {
            let token = req.body.confirmationToken;
            let newPassword = req.body.password;
            await EmployeeModel.findByEmployeeToken(token)
                .then(data => {
                    if (data.length > 0) {
                        bcrypt.hash(newPassword, 10, function (err, hash) {
                            data[0].password = hash
                            EmployeeModel.updateEmployee(data[0])
                                .then(data2 => {
                                    res.status(200).json({
                                        success: true,
                                        message: 'Account created successfully.',
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).send({ message: "Lỗi server" });
                                });
                        });

                    } else {
                        res.send({ message: "Không tìm thấy" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ message: "Lỗi server" });
                });

        } catch (error) {
            console.log(error);
        }

    }
    async resetPasswordByToken(token, newPassword) {
        try {
            const user = await User.findOne({ token: token });
            if (user) {
                user.password = newPassword;
                await user.save();
                return true; // Password reset successful
            }
            return false; // Token not found, password reset failed
        } catch (error) {
            console.error('Error resetting password:', error);
            return false; // An error occurred, password reset failed
        }
    }


    async authLogin(req, res) {
        try {
            const formData = req.body
            bcrypt.hash("admin", 10, (err, data) => {
                console.log(data)
            })
            const account = await EmployeeModel.findAccount(formData.username)
            if (account && bcrypt.compareSync(formData.password, account.password)) {
                const userId = account._id
                const token = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY);
                res.cookie('token', token); // Sử dụng res.cookie để lưu trữ token
                res.cookie('username', formData.username); // Sử dụng res.cookie để lưu trữ token

                return res.redirect('/');
            } else {
                return res.redirect('/login?error=Username+or+password+is+incorrect');
            }


        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = new LoginController();
