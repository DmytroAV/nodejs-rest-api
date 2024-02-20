const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw HttpError(400, "missing required field email")
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "User not found")
    }
}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
}
