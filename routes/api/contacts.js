const express = require('express');

const ctrl = require('../../controllers/ctrlContacts');

const { validateBody } = require('../../middlewares');

const schema = require('../../schemas/schemaContact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(schema.addSchema), ctrl.addContact);

router.put('/:contactId', validateBody(schema.addSchema), ctrl.updateContact);

router.delete('/:contactId', ctrl.removeContact);

module.exports = router;
