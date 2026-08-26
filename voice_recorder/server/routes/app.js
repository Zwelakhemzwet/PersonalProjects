const path = require('path');
const express = require('express');
const router = express.Router();
const config = require('../constants/constants');
const fs = require('fs');

router.get('', async function(req, res){
    try {
        const indexPage = fs.readFileSync(path.join(config.TEMPLATES_DIR, 'index.html'), encoding="UTF-8");
        return res.send(indexPage);
    } catch (err){
        console.error(err);
        return res.redirect('/error-4x');
    }
});

module.exports = router;