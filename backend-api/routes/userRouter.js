const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/list', userController.userListGet);

router.get('/id=:userId', userController.userByIdGet);
router.post('/add', userController.userByIdPost);
router.put('/edit=:userId', userController.userByIdPut);
router.delete('/delete=:userId', userController.userByIdDelete);

module.exports = router;