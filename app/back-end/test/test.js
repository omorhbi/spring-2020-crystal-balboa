const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);


describe("Logging in", ()=>{
    it("will log in when correct credentials are given", done=>{
        chai   
            .request(app)
            .post('/login')
            .send({username: 'SampleMan', password: 'supersample'})
            .end((err, res)=>{
                expect(res.body.token).to.exist;
                done();
            })
    })
    it("will grant an error when incorrect credentials are given", done=>{
        chai
            .request(app)
            .post('/login')
            .send({username: "1", password: "1"})
            .end((err, res)=>{
                expect(res.body.mistake).to.exist;
                done();
            })
    })
});

describe("Signing up", ()=>{
    it("will grant an error when signup credentials don't fit criteria", done=>{
        chai
            .request(app)
            .post('/signup')
            .send({username: "1", password: "1"})
            .end((err, res)=>{
                expect(res.body.mistake).to.exist;
                done();
            })
    })
});
