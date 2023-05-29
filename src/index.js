import 'dotenv/config.js'
import express from 'express'
import mongoose from 'mongoose'
import prodModel from "./models/Product.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js"
import multer from 'multer'
import { __dirname, __filename } from './path.js'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io'

//import { userModel } from './models/user.js' 


const app = express()
const PORT = 4000


//Middleware
//app.use(cookieParser(process.env.COOKIE))
app.use(express.json())
//app.use(session({

//}))
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.resolve(__dirname, './public')))


await mongoose.connect(process.env.URL_MONGODB_ATLAS)
    .then(() => console.log("DB is connected"))
    .catch((error) => console.log("Error en MongoDB atlas", error))


//handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Crear cookie
/*app.get('/setCookie', (req, res) => {
    //Nombre cookie - Valor asociado a dicha cookie
    res.cookie('CookieCookie', "Esta es mi primer cookie")
    res.send("cookie Creada")
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
*/


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


//routes
app.use('/product', productRouter)
app.use('/cart', cartRouter)


