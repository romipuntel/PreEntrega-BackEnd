import local from 'passport-local'
import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github2'
import { userModel } from '../models/User.js'
import { createHash, validatePassword } from '../utilis/bcrypt.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, gender } = req.body
            try {
                const user = await userModel.findOne({ email: email })

                if (user) {
                    return done(null, false) //Usuario ya registrado, false no se creo ningun usuario
                }
                //Usuario no existe
                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    gender: gender,
                    password: passwordHash
                })
                console.log(userCreated)
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }

        }))

    //Configuracion de passport para sessiones
    //Inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await userModel.findOne({ email: username })

            if (!user) { //Usuario no encontrado
                return done(null, false)
            }

            if (validatePassword(password, user.password)) { //Usuario logueado
                return done(null, user)
            }

            return done(null, false)//Contraseña no valida

        } catch (error) {
            return done(error)
        }
    }))

}
export default initializePassport
