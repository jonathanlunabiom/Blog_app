const auth = (req,res,next) => {
    !req.session.logged ? res.redirect('/login') : next();
}

module.exports = auth;