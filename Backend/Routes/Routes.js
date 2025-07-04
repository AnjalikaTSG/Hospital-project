const express=require('express');
const router=express.Router();

// should import function paths
const getData=require('../Functions/postData');

router.get('postData', (req, res) => {
    getData(req, res)
});

module.exports=router;