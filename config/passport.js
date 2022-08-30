const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

const User = require('../models/userModels')

function initialize(passport){
    passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        User.findOne({
            email:email
        }).then((user)=>{
            if(!user) return done(null, false, {message:'user doesnt exist'})

            bcrypt.compare(password, user.password,(err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null, false, {message:"password incorrect"})
                }
            })
        })
    }));

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user);
        })
    })
}

module.exports = initialize