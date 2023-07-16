import { Router } from 'express'
import { prodController } from "../controllers/producto.controller.js"


const router = Router()

router.get('/:productos', prodController.getProducts)


export default router
