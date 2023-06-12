import local from "passport-local";
import passport from "passport";
import {creatHash,validatPassword} from '../utilis/bcrypt'

const LocalStrategy = local.Strategy

passport.use('register',new LocalStrategy(
    {passReqToCallback:true, usernameField: " email"},async (req,username,password,done) =>{
       const {first_name,last_name,email,age,gender} = req.body
       try{
        const user = await User.findOne({email:email})
        if (user){
            return done (null,false)
        }
        const passwordHash= creatHash(password)
        const userCreated= User.create{}
        first_name:first_name,
        last_name: 
       }catch(error){
        return done(error)
       }
    } )
)
