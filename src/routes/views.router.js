import { Router } from "express";


const userRouter = Router()


userRouter.get('/', (req, res) => {
    res.render('form')
})

userRouter.get('/', (req, res) => {
    res.render('login')
})

userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

userRouter.get('/errorSignup', (req, res) => {
    res.render('errorSignup')
})

userRouter.get('/profile', (req, res) => {
    console.log(req);
    res.render('profile')
})



export default userRouter