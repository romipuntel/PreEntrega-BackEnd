import 'dotenv/config.js'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js"
import routerSession from './routes/session.js'
import userRouter from './routes/users.js'
import multer from 'multer'
import { __dirname, __filename } from './path.js'
import passport from 'passport'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

//import { userModel } from './models/user.js' 


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


const PORT = 4000

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




//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


/*await prodModel.insertMany([
    { "title": "Alamos", "description:": "Chardonnay", "code": "29345", "category": "vino blanco", "price": "3000", "stock": "33", "status": "true", "thumbnail": "[]" },
    { "title": "Sur de los andes", "description:": "Cabernet Franc", "code": "23291", "category": "vino tinto", "price": "4000", "stock": "44", "status": "true", "thumbnail": "[]" },
    { "title": "El gran Enemigo", " description:": "Malbec", "code": "12134", "category": "vino tinto", "price": "15000", "stock": "5", "status": "true", "thumbnail": "[]" },
    { "title": "Trivento Reserva", "description": "Malbec", "code": "45029", "category": "vino tinto", "price": "30000", "stock": "20", "status": "true", "thumbnail": "[]" },
    { "title": "Trapicche", "description": "Cabernet Savignuin", "code": "97891", "category": "vino tinto", "price": "25000", "stock": "10", "status": "true", "thumbnail": "[]" },
    { "title": "luigi Bosca", " description": "Malbec", "code": "12578", "category": "vino tinto", "price": "5700", "stock": "25", "status": "true", "thumbnail": "[]" },
    { "title": "clos de los 7", "description": "Blend", "code": "21291", "category": "vino tinto", "price": "3200", "stock": "19", "status": "true", "thumbnail": "[]" },
    { "title": "Sur de los andes", "description": "Malbec", "code": "12784", "category": "vino tinto", "price": "4500", "stock": "32", "status": "true", "thumbnail": "[]" },
    { "title": "Luca G", "description": "Chardonnay", "code": "90652", "category": "vino blanco", "price": "12000", "stock": "5", "status": "true", "thumbnail": "[]" },

])

*/




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

