//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('Teste do endpoint cliente', () => {
beforeEach((done) => { //Before each test we empty the database
           done();             
    });
    describe('/Post cliente', () => {
      it('Nao deve funcionar', (done) => {
      var cliente={
        'nome': 'TESTE EMPRESA', 
        };
        chai.request(server)
            .post('/api/clientes')
            .send(cliente)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(false);
              done();
            });
      });
      it('Deve colocar cliente', function(done) {
      var cliente={
        'nome': 'TESTE EMPRESA', 
        'cnpj': '95284516000111'
        };
        chai.request(server)
            .post('/api/clientes')
            .send(cliente)
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
  describe('/GET/:cnpj cliente', () => {
      it('deve pegar o cliente pelo cnpj', (done) => {
      var cliente={
            'nome': 'TESTE EMPRESA', 
            'cnpj': '95284516000111'
        };
        chai.request(server)
        .get('/api/clientes/'+ cliente.username)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('nome');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have.property('tipo');
            res.body.data.should.have.property('username').eql(cliente.username);
            done();
        });

      });
  });
  /*
  * Put cliente
  */
  describe('/Put cliente', () => {
    var cliente={
        'nome': 'TESTE EMPRESA', 
        'cnpj': '95284516000111'
        };
    it('deve atualizar cliente', (done) => {    
            chai.request(server)
            .get('/api/clientes/'+ cliente.username)
            .end((err, res) => {
                chai.request(server)
                .put('/api/clientes/'+ res.body.data.cliente_id)
            .send(cliente)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('status');
                response.body.status.should.be.a('boolean');
                response.body.status.should.equal(true);
                done();
            });
        });
    });
  });
 /*
  * Test the /GET route
  */
  describe('/GET clientes', () => {
      it('it should GET all the clientes', (done) => {
        chai.request(server)
            .get('/api/clientes')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(true);
                res.body.data.should.be.a('array');
                done();
            });
      });
  });


  /**
   * Delete cliente
   */
  describe('/Delete cliente', () => {
    var cliente={
        'nome': 'vitor2', 
        'email': 'vlima2@redhat.com',
        'username':'vitor2',
        'password':'teste2',
        'tipo':'administrador'
        };
        it('deve deletar cliente', (done) => {    
                 chai.request(server)
                .get('/api/clientes/'+ cliente.username)
                .end((err, res) => {
                    chai.request(server)
                    .delete('/api/clientes/'+ res.body.data.cliente_id)
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        response.body.status.should.be.a('boolean');
                        response.body.status.should.equal(true);
                        done();
                     });
                });
            });
        });
});