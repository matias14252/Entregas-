import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import passport from 'passport';
import jwt from 'passport-jwt';
import { createHash, validatePassword } from '../utils/bcrypt.js';
import { userModel } from '../models/users.models.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

    const cookieExtractor = req => {
        const token = req.signedCookies.jwtCookie ? req.signedCookies.jwtCookie : null;
        return token;
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {

            const { first_name, last_name, email, age } = req.body;

            try {
                const user = await userModel.findOne({ email: email });
                if (user) {
                    return done(null, false, { message: 'Usuario existente' });
                }

                const passwordHash = createHash(password);
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: email,
                    password: passwordHash
                });
                
                return done(null, userCreated);
                
            } catch (error) {
                return done(error);
            }
    }));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });

                if (!user) {
                    return done(null, false, { message: 'Usuario inválido' });
                }

                if (validatePassword(password, user.password)) {
                    return done(null, user);
                }

                return done(null, false, { message: 'Usuario inválido' });

            } catch (error) {
                return done(error);
            }
    }));

    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email });
            if (user) {
                done(null, user);
            } else {
                await userModel.create({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18,
                    password: createHash(profile._json.email + profile._json.name)
                });
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });

}

export default initializePassport;