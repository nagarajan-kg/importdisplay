const express = require('express');
const router = express.Router();
const { getUsers, importUsers } = require('../controllers/userController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', getUsers);
router.post('/import', upload.single('file'), importUsers);

module.exports = router;
