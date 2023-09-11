const sequelize = require('../config/connection');
const {Post, User} = require('../models')

const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDB = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData);

    // for (const post of postData) {
    //     await Post.create({
    //       ...post,
    //       user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    //   }
    
    await Post.bulkCreate(postData);
    process.exit(0);
};

seedDB();