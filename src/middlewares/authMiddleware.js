// authMiddleware.js
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const EmployeeModel = require('../app/models/employee.model')

const checkLogin = (req, res, next) => {
  const token = req.cookies.token; // Lấy token từ cookie

  if (!token) {
      // Nếu không có token, chuyển hướng về trang đăng nhập
      return res.redirect('/login');
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
          // Nếu token không hợp lệ, chuyển hướng về trang đăng nhập
          return res.redirect('/login');
      }

      // Lưu thông tin người dùng vào request để sử dụng trong các xử lý tiếp theo
      req.user = user;
      next();
  });
};

const checkAdmin = (req, res, next) => {
    //Get user from database
    EmployeeModel.findByEmployeeId(req.user.userId)
        .then(data =>{
            if(!data[0].is_admin){
                return res.status(403).send('Access Denied');
            } else {
                next()
            }
        })
        .catch(error => {
            return res.status(403).send('Access Denied');
        })
    

}
  
const logout = (req, res, next) => {
    // Xóa thông tin người dùng khỏi session
    req.session.destroy();
  
    // Xóa cookie người dùng
    res.clearCookie('token');
  
    // Chuyển hướng đến trang đăng nhập
    res.redirect('/login');
};
  
module.exports = {
    checkLogin,
    logout,
    checkAdmin
};
  