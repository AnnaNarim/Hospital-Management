const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Sequelize=require('sequelize')
const users=require('../schemas/db').users
JWT_KEY =String(process.env.JWT_KEY);
const opts = {
    secretOrKey: JWT_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, async (payload, done) =>{
        
         await users.findOne({_id:payload._id})
         .then((user)=>{   
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
         }).catch(err=> done(null, user))     
      }
    ));
};
