//Imports............................................
const router = require('express').Router();
const { User, Profile, UserTechnology, Technology } = require('../../models');

//HomeRoutes........................................

//POST//http://localhost:3001/api/users/
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city: req.body.city,
      country: req.body.country,
      github: req.body.github,
      linkedin: req.body.linkedin,
      experience: req.body.experience,
    });
    await Profile.create({
      userid: dbUserData.id,
      aboutme: null,
      portfolio: null,
      mainproject: null,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST//http://localhost:3001/api/users/login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//PUT//http://localhost:3001/api/users/mainproject
router.put('/mainproject', (req, res) => {
  Profile.update({
    mainproject: req.body.mainproject,
    userid: req.session.user_id
  },
  {
    where: {
      userid: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No mainproject found..' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//PUT//http://localhost:3001/api/users/portfolio
router.put('/portfolio', (req, res) => {
  Profile.update({
    portfolio: req.body.portfolio,
    userid: req.session.user_id
  },
  {
    where: {
      userid: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No mainproject found..' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//PUT//http://localhost:3001/api/users/aboutme
router.put('/aboutme', (req, res) => {
  Profile.update({
    aboutme: req.body.aboutme,
    userid: req.session.user_id
  },
  {
    where: {
      userid: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No mainproject found..' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST//http://localhost:3001/api/users/tech
router.post('/tech', async (req, res) => {
  try {
    await Technology.findOne({
      where: {
        techname: req.body.tech
      },
    }).then(techData => {
      if (techData) {
        res.status(400).json({ message: 'Tech already exists' });
        return;
      } else if (!techData) {
        Technology.create({
          techname: req.body.tech
        });
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//PUT//http://localhost:3001/api/users/mytech
router.put('/mytech', async (req, res) => {
  try {
    const tech = await Technology.findOne({
      where: {
        techname: req.body.tech,
      },
    });
    const techData = tech.get({ plain: true});
    console.log(techData);
    await UserTechnology.findOne({
      where: {
        userid: req.session.user_id,
        techid: techData.id,
        name: techData.techname
      },
    }).then(data => {
      if (data) {
        res.status(400).json({ message: 'Already have the tech added' });
        return;
      } else if (!data) {
        UserTechnology.create({
          techid: techData.id,
          userid: req.session.user_id,
          name: techData.techname,
        });
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//POST//http://localhost:3001/api/users/
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city: req.body.city,
      country: req.body.country,
      github: req.body.github,
      linkedin: req.body.linkedin,
      experience: req.body.experience,
    });
    await Profile.create({
      userid: dbUserData.id,
      aboutme: null,
      portfolio: null,
      mainproject: null,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




//POST//http://localhost:3001/api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
      res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});


//Exports............................................
module.exports = router;
  