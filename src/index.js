import 'dotenv/config.js'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js"
import routerSession from './routes/session.js'
import userRouter from './routes/user.js'
import multer from 'multer'
import { __dirname, __filename } from './path.js'
import passport from 'passport'
import initializePassport from './config/passport.js'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io'
import mongoose from 'mongoose'



const app = express()

//Middleware
app.use(cookieParser(process.env.COOKIE))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGODB_ATLAS,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 210
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//app.use(express.static(path.resolve(__dirname, './public')))



await mongoose.connect(process.env.URL_MONGODB_ATLAS)
    .then(() => console.log("DB is connected"))
    .catch((error) => console.log("Error en MongoDB atlas", error))


//handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Crear cookie
app.get('/crearCookie', (req, res) => {
    //Nombre cookie - Valor asociado a dicha cookie
    res.cookie('CookieCookie', "Esta es mi primer cookie").send("cookie Creada")
})

//Consultar cookie

app.get('/getCookie', (req, res) => {
    //Nombre cookie - Valor asociado a dicha cookie
    res.send(req.cookies)
})

//eliminar cookie

app.get('/.deleteCookie', (req, res) => {
    res.clearCookie('cookieCookie').send("cookie Eliminada")
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})


const PORT = 4000

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


//server Socket io
const io = new Server(server, { cors: { origin: "", credentials: true } })
const mensaje = []

io.on('connection', (socket) => {
    console.log("cliente conectado")
    socket.on('mensaje', info => {
        console.log(`Recibi mensaje ${info}`)
    })
    socket.on("nuevoProducto", (prod) => {
        console.log(prod)
    })
})

app.use((req, res, next) => {
    req.io = io
    return next()
})


//Config passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


//routes
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/session', routerSession)
app.use('/user', userRouter)

