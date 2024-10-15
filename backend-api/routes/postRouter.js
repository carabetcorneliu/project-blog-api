const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/list', postController.postListGet);
router.post('/add', postController.postByUserIdPost);
router.put('/edit=:id', postController.postByIdPut);
router.delete('/delete=:id', postController.postByIdDelete);

module.exports = router;