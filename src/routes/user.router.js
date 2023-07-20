import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'


const router = Router()

router.get('/', userController.findAllUsers)
router.get('/:idUser', userController.findOneUser)
router.post('/', userController.createOneUser)
router.delete('/:idUser', userController.deleteOne)

export default router



