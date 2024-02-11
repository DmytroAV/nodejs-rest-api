const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody, isValidId, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerUser), ctrl.register);

router.get('/login', validateBody(schemas.loginUser), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;