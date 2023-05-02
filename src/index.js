import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js"
import multer from 'multer'
import { __dirname, __filename } from './path.js'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from 'socket.io'


const app = express()
const PORT = 4000
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


//handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, './public')))
const upload = multer({ storage: storage })


//server Socket io
const io = new Server(server, { cors: { origin: "", credentials: true } }) //{cors: {origin:""}}
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
app.post('/upload', upload.single('product'), (req, res,) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")

})

