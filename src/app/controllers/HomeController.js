const UserModel = require('../models/employee.model')
const cookieLib = require('cookie')
const jwt = require('jsonwebtoken')

class HomeController {
    // GET /home
    async home(req, res, next) {
        try {
            const cookieString = req.headers.cookie;
            const cookies = cookieLib.parse(cookieString);
            const token = cookies.token;
            const username=cookies.username;
            if(!token) {
                res.redicrerect('/login')
            }
            
            // GET USERID FROM TOKEN AND SOLVE
            jwt.verify(username, process.env.TOKEN_SECRET_KEY, async function (err, decoded) {

                const users = await UserModel.findAccount(username)
                console.log(users)
                if(users.admin) {
                    res.render("pages/home", { name: "admin : " + users.username })
                }
                else {
                    res.render("pages/home", { name: "staff : " + users.username})
                }
            });
        } catch (error) {
            console.log(error);
            res.render("pages/home")
        }
    }
}

module.exports = new HomeController();
