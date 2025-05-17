const express = require("express")
const userController = require("../controllers/UserController")
const { jwtAuthMiddleware } = require("../jwt")
const router = express.Router()



router.get("/",jwtAuthMiddleware,userController.getAllUsers)


router.post('/register', async (req, res) => {
  try {
    console.log("Backend Registration Request Received:", req.body)
    
    // Validate input
    const { email, password, confirmPassword } = req.body
    
    // Comprehensive input validation
    if (!email) {
      return res.status(400).json({ 
        message: "Email is required",
        field: "email"
      })
    }
    if (!password) {
      return res.status(400).json({ 
        message: "Password is required",
        field: "password"
      })
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        message: "Passwords do not match",
        field: "confirmPassword"
      })
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ 
        message: "User already exists",
        field: "email"
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword
    })

    await newUser.save()

    res.status(201).json({ 
      message: "User registered successfully",
      userId: newUser._id 
    })
    
    // Rest of your registration logic
  } catch (error) {
    console.error("Backend Registration Error:", error)
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message 
    })
  }
})
router.post("/login", userController.loginUser)
module.exports = router