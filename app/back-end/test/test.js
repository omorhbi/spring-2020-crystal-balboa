const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);

describe("Search results", ()=>{
    it("returns object that contains array of objects", done=>{
        chai
            .request(app)
            .post('/location/show')
            .send({resObject: {resName: 'Bagel', resLoc: "Lower East Side, New York City"}})
            .end((err, res) =>{
                expect(res.body.restaurants).to.be.a('array');
                expect(res.body.restaurants[0]).to.be.a('object');
                expect(res.body.restaurants.length).to.equal(10);
                done();
            })
    })
    it("should log error if an error occurs", done =>{
        chai
            .request(app)
            .post('/location/show')
            .send({resObject: {resName: null, resLoc: null}})
            .end((err, res)=>{
                expect(err);
                done();
            })
    })
})