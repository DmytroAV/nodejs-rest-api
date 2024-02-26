const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
require('dotenv').config();
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw HttpError(400, "missing required field email")
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "User not found")
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}" >Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
        message: "Verification email sent"
    })
}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
}
