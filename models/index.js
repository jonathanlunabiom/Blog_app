const Post = require('./Post');
const User = require('./User');

User.hasMany(Post,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

Post.belongsTo(User,{
    foreignKey: 'userId'
})

//here we are gonna need to send the User too
module.exports = { Post , User};
