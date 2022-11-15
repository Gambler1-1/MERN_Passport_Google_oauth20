var passport = require('passport')
const bcrypt = require('bcryptjs')


const session = require('express-session')


var LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const { Passport } = require('passport')

const customFields = {
    usernameField: 'email',
    passwordField: 'password'

};

const verifyCallback = async (email, password, done) => {

try {
    const user = await User.findOne({ email: email })
    if (!user) {
        console.log('No User with this Email')

        return done(null, false ,{errorMessage: 'no user with this email'})
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
        console.log('password matched')
        return done(null, user)
    }
    else {

        console.log('password not matched')

        return done(null, false)

    }
    
} catch (error) {
    done(error)
    
}
    
}

const strategy = new LocalStrategy(customFields , verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done (null, user.email);
});

passport.deserializeUser(async (email, done) =>{
    try{
        user =await User.findOne({email:email})
    if(user){
        done( null, user);
    }
    }
    catch(err){
        done(err)
    } 
})
