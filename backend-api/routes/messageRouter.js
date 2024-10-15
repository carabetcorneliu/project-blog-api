const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/list', messageController.messageListByPostIdGet);
router.post('/add', messageController.messageByPostIdPost);
router.put('/edit=:id', messageController.messageByIdPut);
router.delete('/delete=:id', messageController.messageByIdDelete);

module.exports = router;

