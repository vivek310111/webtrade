const express = require('express');
const router = express.Router()
const cors = require('cors');
const {test, registerUser, loginUser} = require('../controllers/authcontrollers')


//middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://web-trade.netlify.app'
    })
)

router.get("/register", test)
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router