//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('Books', () => {
beforeEach((done) => { //Before each test we empty the database
           done();             
    });
 /*
  * Test the /GET route
  */
  describe('/GET usuarios', () => {
      it('it should GET all the usuarios', (done) => {
        chai.request(server)
            .get('/api/usuarios')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(true);
                res.body.data.should.be.a('array');
                //res.body.data.length.should.be.eql(0);
                done();
            });
      });
  });

  describe('/Post usuario', () => {
      it('Nao deve funcionar', (done) => {
        var usuario = {
                'nome': 'vitor2', 
                'email': 'vlima2@redhat.com',
                'tipo':'administrador'
        };
        chai.request(server)
            .post('/api/usuarios')
            .send(usuario)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(false);
              done();
            });
      });
      it('Deve colocar usuario', function(done) {
        var usuario={
                'nome': 'vitor2', 
                'email': 'vlima2@redhat.com',
                'username':'vitor2',
                'password':'teste2',
                'tipo':'administrador'
                };
        chai.request(server)
            .post('/api/usuarios')
            .send(usuario)
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
  * Test the /GET/:id route
  */
  describe('/GET/:id usuario', () => {
      it('it should GET a book by the given id', (done) => {
        var usuario={
                'nome': 'vitor2', 
                'email': 'vlima2@redhat.com',
                'username':'vitor2',
                'password':'teste2',
                'tipo':'administrador'
                };
        chai.request(server)
        .get('/api/usuarios/'+ usuario.username)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('nome');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('password');
            res.body.data.should.have.property('tipo');
            res.body.data.should.have.property('username').eql(usuario.username);
            done();
        });

      });
  });
  /*
  * Put usuario
  */
  describe('/Put usuario', () => {
    var usuario={
        'nome': 'vitor2', 
        'email': 'vlima2@redhat.com',
        'username':'vitor2',
        'password':'teste2',
        'tipo':'administrador'
        };
    chai.request(server)
    .get('/api/usuarios/'+usuario.username)
    .end(function(err, res){ 
      it('deve atualizar usuario', (done) => {
        chai.request(server)
        .put('/api/usuarios/'+ res.body.data.usuario_id)
        .send(usuario)
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
  /**
   * Delete usuario
   */
  describe('/Delete usuario', () => {
    var usuario={
        'nome': 'vitor2', 
        'email': 'vlima2@redhat.com',
        'username':'vitor2',
        'password':'teste2',
        'tipo':'administrador'
        };
    chai.request(server)
    .get('/api/usuarios/'+usuario.username)
    .end(function(err, res){ 
      it('deve deletar usuario', (done) => {
        chai.request(server)
        .delete('/api/usuarios/'+ res.body.data.usuario_id)
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