import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from "./routes/cart.routes.js"
import multer from 'multer'
import { __dirname, __filename } from './path.js'

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


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const upload = multer({ storage: storage })

//routes
app.use('/product', productRouter)
app.use('static', express.static(__dirname + 'public'))
app.use('/cart', cartRouter)
app.post('/upload', upload.single('product'), (req, res,) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen subida")

})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
