const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// route = /api/users/
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      //here is where the status changes to true WithAuth (true)
      req.session.logged = true;

      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {     
    //userData is now an extension of the model so it has access to the methods of the obj.
    const userData = await User.findOne({ where: { email: req.body.email }, raw: true, });
    console.log(userData)

    //FIRST CHECKING if there's an email existing it doesnt return and continues
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    };

    //Second filter checks the password
    //UserData
    const validPassword = await userData.checkPass(req.body.password);

    if (!validPassword) {
      console.log('hello')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    //init session and turn auth flag true
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', withAuth ,(req, res) => {
  //destroying session
  if (req.session.logged) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
