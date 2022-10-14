const chai = require("chai");
const chaiHttp = require("chai-http");
const User = require("../model/user");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
    const first_name = "first name";
    const last_name = "last name";
    const email = "test@email.com";
    beforeEach((done) => {
        User.create({first_name, last_name, email}, (res) => {
            done();
        });
    });
    afterEach((done) => {
        User.findOneAndDelete({ email: email }, (res) => {
            done();
        });
    })

    describe("GET /user/all", () => {
        it("should get all users record", (done) => {
            chai.request(app)
                .get('/user/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1);
                    done();
                });
        });
    });
    describe("POST /user/add", () => {
        it("should add a user record", (done) => {
            chai.request(app)
                .post('/user/add')
                .send({first_name, last_name, email: "test@test.com"})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
        after((done) => {
            User.findOneAndDelete({ email: "test@test.com" }, (res) => {
                done();
            });
        })
    });
    describe("PUT /user/update", () => {
        it("should update a user record", (done) => {
            chai.request(app)
                .put('/user/update')
                .send({first_name: "updated first name", last_name, email})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('first_name').that.equal("updated first name");
                    done();
                });
        });
    });
    describe("DELETE /user/delete", () => {
        it("should delete a user record", (done) => {
            chai.request(app)
                .delete('/user/delete')
                .send({email: email})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    
});