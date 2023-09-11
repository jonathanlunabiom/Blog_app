const router = require('express').Router();
const { Post , User } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async(req,res)=>{
    try{
        //fetching the model post and the User's model with the attribute "name"
        const postData = await Post.findAll({
            include:[{
                model: User,
                attributes: ['name']
            }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('homepage',{
            posts
        })
        console.log(posts)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/dashboard',(req,res)=>{
    try{
        const info = req.body
        Post.create(info)
    }catch(err){
        res.status(500).json(err.message)
    }
})

router.get('/login',(req,res)=>{

    if (req.session.logged) {
        res.redirect('/dashboard');
        return;
    }
    
    res.render('login');
})

router.get('/dashboard',withAuth,async(req,res)=>{
    try{
        res.render('dashboard')
    }catch(err){
        res.status(500).json(err.message);
    }
    res.render('dashboard')
})

module.exports = router;