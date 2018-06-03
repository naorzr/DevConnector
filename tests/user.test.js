const expect = require("expect");
const request = require("supertest");

const User = require("../models/User");
const { populateUsers } = require("./seeds");
const { app } = require("../server");
const { seedUser } = require("./seeds");

before(populateUsers);

describe("POST /register", () => {
  var userOne = {
    name: "naor",
    email: "naor@gmail.com",
    password: "123456",
    password2: "123456"
  };

  var userTwo = {
    user: "naorzzzzz",
    email: "test@gmail.com",
    password: "123455",
    password2: "123456"
  };

  var errUser = Object.assign({}, userTwo);

  it("Should register a new user", done => {
    request(app)
      .post("/api/users/register")
      .send(userOne)
      .expect(200)
      .expect(res => {
        expect(res.body).toInclude({
          name: userOne.name,
          email: userOne.email
        });
        expect(res.body.password).toNotBeA(userOne.password); //password needs to be hashed
        expect(res.body.password).toExist();
        expect(res.body.avatar).toExist();
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it("Shouldn't Register a new user without a user name", done => {
    errUser.name = null;
    request(app)
      .post("/api/users/register")
      .send(errUser.user)
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it("Shouldn't Register a new user without a matching password", done => {
    errUser = Object.assign({}, userTwo);
    errUser.password2 = null;
    request(app)
      .post("/api/users/register")
      .send(errUser.password2)
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it("Shouldn't Register a new user with an invalid email", done => {
    errUser.email = "invalid";
    request(app)
      .post("/api/users/register")
      .send(errUser)
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });
});

describe("POST /login", () => {
  it("Should Login and return an JWT token", done => {
    request(app)
      .post("/api/users/login")
      .send({ email: seedUser.email, password: seedUser.password })
      .expect(200)
      .expect(res => {
        expect(res.body.token).toExist();
        // Bearer formatted
        expect(res.body.token).toContain("Bearer");
        // Makes sure its in a JWT format
        expect(res.body.token.split(".").length).toBe(3);
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it("Shouldn't login with invalid password", done => {
    request(app)
      .post("/api/users/login")
      .send({ email: seedUser.email, password: "123459" })
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });

  it("Shouldn't login with invalid email", done => {
    request(app)
      .post("/api/users/login")
      .send({ email: "invalid@email", password: seedUser.password })
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
  });
});
