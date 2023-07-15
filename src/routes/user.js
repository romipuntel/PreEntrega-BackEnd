import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import passport from 'passport'

const router = Router()

router.get('/', userController.findAllUsers)
router.get('/:idUser', userController.findOneUser)
router.post('/', userController.createOneUser)
router.delete('/:idUser', userController.deleteOne)

export default router




/* userRouter.post("/register", passport.authenticate("register"), createUser)

userRouter.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/api/views')
        }
    })
})



// persistencia mongo

userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        return res.redirect('/api/views/errorSignup')
    }
    const hashPassword = await hashData(password)
    const newUser = { ...req.body, password: hashPassword }
    await userModel.create(newUser)
    res.redirect('/api/views')
})
//login con passport
userRouter.post(
    '/login',
    passport.authenticate('login', {
        passReqToCallback: true,
        failureRedirect: '/api/views/errorLogin',
        successRedirect: '/api/views/profile',
        failureMessage: '',
    })
)

// github

userRouter.get(
    '/githubSignup',
    passport.authenticate('githubSignup', { scope: ['user:email'] })
)

userRouter.get('/github',
    passport.authenticate('githubSignup', { failureRedirect: '/api/views' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/api/views/profile')
    })
*/
