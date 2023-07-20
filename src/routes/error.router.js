import express from 'express'
import compression from 'express-compression'
import CustomError from './utils/errors/CustomError.js'
import { ErrorsCause, ErrorsMessage, ErrosName } from './utils/errors/errors.enum.js'
import { errorMiddleware } from './utils/errors/errors.middleware.js'


app.use(compression({ brotli: { enabled: true, zlib: {} } }))

app.get('/', (req, res) => {
    let info = 'Primera prueba compresion'
    for (let i = 0; i < 100000; i++) {
        info += 'Agregando desde el ciclo for'
    }
    res.send(info)
})

app.post('/products', (req, res) => {
    CustomError.createCustomError({
        name: ErrosName.PRODUCT_PRINCIPAL_ERROR_POST,
        message: ErrorsMessage.PRODUCT_PRINCIPAL_ERROR_POST,
        cause: ErrorsCause.PRODUCT_PRINCIPAL_ERROR_POST,
    })

})

app.get('/products', (req, res) => {
    CustomError.createCustomError({
        name: ErrosName.PRODUCT_PRINCIPAL_ERROR_GET,
        message: ErrorsMessage.PRODUCT_PRINCIPAL_ERROR_GET,
        cause: ErrorsCause.PRODUCT_PRINCIPAL_ERROR_GET,
    })
})


app.use(errorMiddleware)
