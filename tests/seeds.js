const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedUser = new User({
  name: "example1",
  email: "example1@gmail.com",
  password: "123456",
  password2: "123456"
});



const populateUsers = done => {
  User.remove({}).then(() => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(seedUser.password, salt, (err, hash) => {
        if (err) {
          throw "failed";
        }
        seedUser.password = hash;
        seedUser.save().then(() => {
          seedUser.password = "123456";
        })
      });
    });
    done();
  });
};

module.exports = { populateUsers, seedUser };
