let configuration = {secretOrKey: 'secret'};

if(process.env.NODE_ENV === 'test'){
    configuration.mongoURI = 'mongodb://naorzr:naor3454@ds053146.mlab.com:53146/bunnyrabbitscantest';
}
else {
    configuration.mongoURI = 'mongodb://naorzr:naorzr3454@ds117960.mlab.com:17960/bunnyrabbitscanfly';
}

console.log(configuration);

module.exports = configuration;