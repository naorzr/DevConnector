const User = require("../models/User");

const populateUsers = done => {
  User.remove({}).then(() => {
    const user = new User({
      name: "example1",
      email: "example1@gmail.com",
      password: "123456",
      password2: "123456"
    });
    user.save();
    done();
  });
};

module.exports = { populateUsers };
