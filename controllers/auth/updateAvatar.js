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
    await Jimp.read(tmpUpload).then((img) =>
        img.resize(250, 250).write(`${tmpUpload}`));

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    if (!avatarURL) throw HttpError(404, "Not found");

    res.json({ avatarURL });

};

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar)
};