const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');
const upload = require('../middleware/upload');

router.get('', audioController.getAllAudio);
router.post('/upload', upload.single('audio'), audioController.uploadAudio);
router.get('/:id', audioController.getAudio);
router.delete('/:id', audioController.deleteAudio);
router.get('/download/:filename', audioController.downloadAudio);

module.exports = router;