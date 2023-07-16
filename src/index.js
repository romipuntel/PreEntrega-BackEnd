import express from 'express'
import config from './config/indexConfig.js'
import './config/configDB.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import messagesRouter from './routes/messeges.js'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js"
import routerSession from './routes/session.routes.js'
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import passport from 'passport'
import initializePassport from './config/passport.js'
//import { __dirname } from './utilis/path.js'
import handlebars from 'express-handlebars'

import { Server } from 'socket.io'
import mongoose from 'mongoose'



const app = express()

const PORT = config.port

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


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
app.use('/api/message', messagesRouter)
//app.use(express.static(path.resolve(__dirname, './public')))

//handlebars
app.engine('handlebars', handlebars.engine())
//app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
//app.set('views', path.resolve(__dirname, './views'))

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


//server Socket io
const io = new Server(server, { cors: { origin: "", credentials: true } })
const mensaje = []

io.on('connection', (socket) => {
    console.log("e conectado")
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
app.use('/session', routerSession)
app.use('/api/user', userRouter)
app.use('/api/views', viewsRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/api/message', messagesRouter)
