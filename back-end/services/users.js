const User = require('../schemas/users');

module.exports = {
    createUser: (user) => {
        const dbUser = new User(user);

        return dbUser.save();
    },

    login: async ({username, password}) => {
        const user = await User.findUserByUsername(username);

        if(!user) throw new Error('login error');

        const result = user.comparePassword(password);

        if(!result) throw new Error('login error');

        return user;
    }
}