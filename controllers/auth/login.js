const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    if (!user.verify) {
        throw HttpError(400, "Email not verified")
    }

    const payload = {
        id: user._id
    }

    const token = JWT.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token })

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

module.exports = {
    login: ctrlWrapper(login)
}