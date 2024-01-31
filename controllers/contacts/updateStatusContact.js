const { Contact } = require('../../models/contact');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
        throw HttpError(404, 'missing field favorite');
    }

    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });

    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
}

module.exports = {
    updateStatusContact: ctrlWrapper(updateStatusContact)
}