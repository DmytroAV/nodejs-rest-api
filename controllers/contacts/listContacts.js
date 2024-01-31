const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');


const listContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filterResult = favorite ? { owner, favorite } : { owner };

    const result = await Contact.find(filterResult, null, { skip, limit }).populate("owner", "email subscription");

    res.json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts)
}
