const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const dotenv = require('dotenv')
const app = express()
const authroute = require('./controllers/auth')
const postrouteControl = require('./controllers/post')
const userroute = require('./routes/user')
const postroute = require('./routes/post')
const routes = require('./routes/auth')
const  verifyToken  = require('./middleware/auth')
// import { fileURLToPath } from 'url'
const User = require('./models/User')
const Post = require('./models/Post')
const data = require('./data/index')
/* CONFIGURATIONS */

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

dotenv.config()
app.use(express.json())
// app.use(morgan('common'))
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE to upload  files  */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage })


const PORT = process.env.PORT ? process.env.PORT : 6001


/* ROUTES  WITH  FILES*/
app.post('/auth/register', upload.single('picture'), authroute.register)
app.post('/posts', verifyToken, upload.single('picture'), postrouteControl.createPost)


/*  ROUTES */
app.use('/auth', routes)
app.use('/users', userroute)
app.use('/posts', postroute)

mongoose.connect(process.env.MOGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server port : ${PORT}`))

    //HERE MANUAL PASS ONE TIME DATA
    // User.insertMany(data.users)
    // Post.insertMany(data.posts)
}).catch((err) => {
    console.log("Err  is occured")
})

