const router = require('express').Router();
const { Post , User } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async(req,res)=>{
    try{
        //fetching the model post and including the User's model with the attribute "name"

        const postData = await Post.findAll({
            include:[{
                model: User,
                attributes: ['name']
            }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(req.session.logged)
        res.render('homepage',{
            posts,
            logged: req.session.logged
        })
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/login',(req,res)=>{
    if (req.session.logged) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})

router.get('/dashboard', withAuth, async(req,res)=>{
    try{
        res.render('dashboard')
    }catch(err){
        res.status(500).json(err.message);
    }
});

router.post('/dashboard', withAuth , async(req,res)=>{
    try{
        const userId = req.session.user_id;
        const userName = await User.findByPk(userId,{
            attributes:'name'
        })
        console.log(userName)
        const postData = await Post.create({
            ...req.body,
            userName
        });
        res.status(200).json(postData)
    }catch(err){
        res.status(500).json(err.message);
    }
});

module.exports = router;