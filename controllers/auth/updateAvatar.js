const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { HttpError, ctrlWrapper } = require('../../helpers');

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;

    if (!req.file) throw HttpError(400, "missing field avatar");

    const { path: tmpUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;

    try {
        const resultUpload = path.join(avatarDir, filename);

        const originalAvatar = await Jimp.read(tmpUpload);
        originalAvatar.resize(250, 250).write(resultUpload);
        await fs.unlink(tmpUpload);

        const avatarURL = path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, { avatarURL });

        if (!avatarURL) throw HttpError(404, "Not found");

        res.status(200).json({ avatarURL });
    } catch (error) {
        await fs.unlink(tmpUpload);
        throw error;
    }

};

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar)
};