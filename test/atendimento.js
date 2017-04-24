//During the test the env variable is set to test
process.env.NODE_ENV = 'prod';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var atendimento = {
    "contato": "Vitor - Contato",
    "chamado": true,
    "problema": "Teste Atendimento - Problema",
    "solucao": "teste",
    "aberto": true,
    "tipo_acesso_id": 3,
    "tipo_atendimento_id": 6,
    "valor_id": "5000",
    "usuario_id": 2,
    "cliente": {
        "cnpj": "428.923.118-73",
        "nome": "Vitor Silv"
    },
    "usuario": {
        "id": 2,
        "nome": "Vitor Silva Lima",
        "email": "teste@redhat.com",
        "username": "",
        "password": "teste",
        "tipo": "atendente"
    }
};
var token ="";

chai.use(chaiHttp);
describe('Teste do endpoint atendimento', () => {
    
    it('Testing Login', (done) => {
        chai.request(server)
        .post('/login')
        .send({
            username: atendimento.usuario.username,
            password: atendimento.usuario.password
        })
        .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            res.body.should.include.keys('token', 'token','username','password');
            //console.log(token);
            token = res.body.token;
            done();
        });
    });






beforeEach((done) => { //Before each test we empty the database
           done();             
    });

    describe('/Post atendimento', () => {
        it('Nao deve funcionar', (done) => {
            chai.request(server)
            .post('/api/atendimentos')
            .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsIm5vbWUiOiJ0ZXN0ZSIsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsInVzZXJuYW1lIjoidGVzdGUiLCJwYXNzd29yZCI6InRlc3RlIiwidGlwbyI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE0ODE3NDI4NTEsImV4cCI6MTQ4MTgyOTI1MX0.v2aGT9lWNP9V4DovUhx2DPKsFXIfPiMTmvpCSd14yEc")
            .send(atendimento)
            .end((err, res) => {
                res.should.have.status(501);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('boolean');
                res.body.status.should.equal(false);
                done();
            });

        });

        /*it('Deve colocar atendimento', function(done) {
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
        });*/
        
    });
  
});