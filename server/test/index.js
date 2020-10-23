const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
chai.should();

chai.use(chaiHttp);

describe('Index', () => {
    it('it should valid error message', (done) => {
        chai.request(server)
            .get('/login/failed')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.message.should.be.eql("user failed to authenticate.");
                done();
            });
    });

});