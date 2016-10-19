//During the test the env variable is set to test
process.env.NODE_ENV = 'dev';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('Teste do endpoint atendimento', () => {
beforeEach((done) => { //Before each test we empty the database
           done();             
    });
    describe('/Post atendimento', () => {
        it('Nao deve funcionar', (done) => {
            var atendimento = {
                'nome': 'vitor2', 
                'email': 'vlima2@redhat.com',
                'tipo':'administrador'
            };
            chai.request(server)
            .post('/api/atendimentos')
            .send(atendimento)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(false);
                done();
            });
        });
        it('Deve colocar atendimento', function(done) {
            var atendimento={
                contato: 'Contato Teste', 
                cnpj: '63786145000180',
                nome:'Test CNPJ',
                tipo_acesso:'acesso',
                chamado:true,
                problema:'teste problema',
                solucao:'teste solucao',
                tipo_atendimento: "Contrato",
                username:'vlima',
                aberto: true
            };
            chai.request(server)
            .post('/api/atendimentos')
            .send(atendimento)
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(true);
                done();
            });
        });
    });
  /*
  * Test the /GET/:username route
  */
  describe('/GET/:username atendimento', () => {
      it('it should GET a book by the given id', (done) => {
        var atendimento={
                'nome': 'vitor2', 
                'email': 'vlima2@redhat.com',
                'username':'vitor2',
                'password':'teste2',
                'tipo':'administrador'
                };
        chai.request(server)
        .get('/api/atendimentos/'+ atendimento.username)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('nome');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have.property('tipo');
            res.body.data.should.have.property('username').eql(atendimento.username);
            done();
        });

      });
  });
});