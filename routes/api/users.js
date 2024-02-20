const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody, isValidId, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerUserSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schemas.verifyUserSchema), ctrl.resendVerifyEmail);

router.get('/login', validateBody(schemas.loginUserSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;