 const express = require('express');
 const dotenv = require('dotenv').config()
 const cors = require('cors')
 const {mongoose} = require('mongoose')
 const cookieParser = require('cookie-parser')
 const path = require('path')

 const app = express()

 mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log('Database connected'))
 .catch((err) => console.log('Database not connected', err))

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/authroutes'))
app.use('/', require('./routes/listingroutes'))
app.use('/', require('./routes/contactroutes'))
app.use('/', require('./routes/orderRoutes'))
app.use('/', require('./routes/userRoute'))

 const port = 8000;
 app.listen(port, () => console.log(`server is running on port ${port}`))