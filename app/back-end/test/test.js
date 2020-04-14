const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {expect} = chai;
chai.use(chaiHttp);

describe("Search results", ()=>{
    it("returns object that contains array of objects, each with all their attributtes", done=>{
        chai
            .request(app)
            .post('/location/show')
            .send({resObject: {resName: 'Bagel', resLoc: "Lower East Side, New York City"}})
            .end((err, res) =>{
                expect(res.body.restaurants).to.be.a('array');
                expect(res.body.restaurants[0]).to.be.a('object');
                expect(res.body.restaurants.length).to.equal(10);
                res.body.restaurants.forEach(element => {
                    expect(element).to.satisfy(function(entry){
                        if((entry.name.toLowerCase().includes('bagel') || entry.cuisine.toLowerCase().includes('bagel')) || (entry.location.toLowerCase().includes('new york') || (entry.location.toLowerCase().includes('lower east side')))){
                            return true;
                        }
                        else{
                            return false;
                        };
                    });
                });
                done();
            })
    })
    it("should log error if an error occurs", done =>{
        chai
            .request(app)
            .post('/location/show')
            .send({resObject: {resName: null, resLoc: null}})
            .end((err, res)=>{
                expect(err).to.equal(null);
                done();
            })
    })
    it("should make the location New York City if no name is specified", done=>{
        chai
            .request(app)
            .post('/location/show')
            .send({resObject: {resName: "pizza", resLoc: ''}})
            .end((err, res)=>{
                res.body.restaurants.forEach(element => {
                    expect(element).to.satisfy(function(entry){
                        if(entry.location.toLowerCase().includes('new york') || entry.location.toLowerCase().includes('113') || entry.location.toLowerCase().includes('112') || entry.location.toLowerCase().includes('104') || entry.location.toLowerCase().includes('103') || entry.location.toLowerCase().includes('100') || entry.location.toLowerCase().includes('116')){
                            return true;
                        }
                        else{
                            return false;
                        };
                    });
                });
                done();
            })
    })
});
describe("Search preferences results", ()=>{
    it("returns object that contains array of objects, each with all their attributtes", done=>{
        chai
            .request(app)
            .post('/searchPreferences/show')
            .send({resObject: {resName: 'Chinese', resLoc: "Lower East Side, New York City"}})
            .end((err, res) =>{
                expect(res.body.restaurants).to.be.a('array');
                expect(res.body.restaurants[0]).to.be.a('object');
                done();
            })
    })
    it("should log error if an error occurs", done =>{
        chai
            .request(app)
            .post('/searchPreferences/show')
            .send({resObject: {resName: null, resLoc: null}})
            .end((err, res)=>{
                expect(err).to.equal(null);
                done();
            })
    })
    it("should make the location New York City if no name is specified", done=>{
        chai
            .request(app)
            .post('/searchPreferences/show')
            .send({resObject: {resName: "pizza", resLoc: ''}})
            .end((err, res)=>{
                res.body.restaurants.forEach(element => {
                    expect(element).to.satisfy(function(entry){
                        if(entry.location.toLowerCase().includes('new york') || entry.location.toLowerCase().includes('113') || entry.location.toLowerCase().includes('112') || entry.location.toLowerCase().includes('104') || entry.location.toLowerCase().includes('103') || entry.location.toLowerCase().includes('100') || entry.location.toLowerCase().includes('116')){
                            return true;
                        }
                        else{
                            return false;
                        };
                    });
                });
                done();
            })
    })
});