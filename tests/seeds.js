const User = require ('../models/User');

const depopulateUsers = (done) => {
    User.remove({}).then(() => done());
}


module.exports = {depopulateUsers};