const express = require("express")
const userController = require("../controllers/UserController")
const { jwtAuthMiddleware } = require("../jwt")
const router = express.Router()



router.get("/",jwtAuthMiddleware,userController.getAllUsers)


router.post("/register",userController.registerUser)
router.post("/login", userController.loginUser)
module.exports = router