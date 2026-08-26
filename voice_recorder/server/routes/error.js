const express = require('express');
const router = express.Router();

router.get('4xx', async function(req, res){
    try {
        return res.send('<div class="flex-disp items-center flex-column"><h1>Error 404</h1><p><i>RESOURCE NOT FOUND</i></p><a href="/">home</a></div>');
    } catch(err){
        
    }
});