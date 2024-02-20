const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

const verifyEmail = async (req, res) => {

}

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail)
}