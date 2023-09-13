const router = require('express').Router();
const { User, Post} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth , async(req,res)=>{
    try{

        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(postData)
        res.status(200).json(postData)
    }catch(err){
        res.status(500).json(err.message);
    }
});


module.exports = router;