import { Router } from 'express';
import passport from 'passport';
import { postLogin, postRegister, getGithubCallback, getLogout, getCurrentToken } from '../controllers/sessions.controllers.js';
import { passportError, authorization } from '../utils/messagesError.js';

const sessionsRouter = Router();

sessionsRouter.post('/login', passportError('login'), postLogin);
sessionsRouter.post('/register', passportError('register'), postRegister);
sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});
sessionsRouter.get('/githubCallback', passport.authenticate('github', { session: false, failureRedirect: '/userlogin' }), getGithubCallback);
sessionsRouter.get('/logout', passportError('jwt'), getLogout);
sessionsRouter.get('/current', passportError('jwt'), getCurrentToken);

export default sessionsRouter;