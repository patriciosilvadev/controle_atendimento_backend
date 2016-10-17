var db = require('../database/postgresqlDB');
var Promise = require("bluebird");

function getCnpjID(cnpj,nome){
  return new Promise(function(resolve, reject){
    db.oneOrNone("Select cnpj from cliente where nome=${nome}",{"nome":nome})
    .then(function(data){
      if(data==null){
        return db.none("Insert into cliente(cnpj,nome) values (${cpnj},${nome})"
        ,{
          "nome":nome,
          "cpnj":cnpj
        })
      }else{
        resolve();
      }
    })
    .then(function(){
          console.log("inserido com sucesso!!!");
          resolve();
      })
      .catch(function(err){
       reject(err);
      });
    });
}

function create(req, res, next) {
  //var cnpj=parseInt(req.body.cnpj);
  var cnpj=req.body.cnpj;
  var nome=req.body.nome;
  console.log(cnpj);
  getCnpjID(cnpj,nome).then(function(){
    res.status(200)
    .json({
      status: true,
      message: 'Atualizado com sucesso'
    });
  })
  .catch(function(err){
    res.status(200)
    .json({
      status: false,
      message: 'Atualizado com sucesso'
    });
  });
}


/*function insert(req, res, next){
  db.tx(function(t) {
        return t.oneOrNone("Select id from nome where nome=$1","Mike")
        .then(user=>{
          console.log(user);
          if(user==null){
            return t.one('INSERT INTO nome(nome) VALUES($1) RETURNING id', ['Mike']);
          }else{
            return user;
          }
        })
        .then(user=> {
            return t.none('INSERT INTO sobrenome(nome_id, sobrenome) VALUES($1, $2)', [user.id, 'silva']);
        });
    })
    .then(function(data) {
        // data = as returned from the transaction's callback
        console.log(data);
        res.status(200)
        .json({
          status: true,
          data:data,
          message: 'Atualizado com sucesso'
        });
    })
    .catch(function(error) {
        // error
        console.log(error);
        res.status(200)
        .json({
          status: false,
          err:err,
          message: 'Atualizado com sucesso'
        });
    });
}*/


function insert(req, res, next){
  db.tx(function(t) {
        return t.oneOrNone("Select cnpj from cliente where nome=${nome}",req.body)
        .then(cliente=>{
          console.log(cliente);
          if(cliente==null){
            return t.one('INSERT INTO cliente(cnpj,nome)'
                        +'VALUES(${cnpj},${nome}) RETURNING cnpj', req.body);
          }else{
            return cliente;
          }
        })
        .then(()=> {
            return t.none('INSERT INTO atendimento(atendimento_id, data_inicio,'
            +'data_fim, contato, tipo_acesso, chamado, problema, solucao, '
            +'tipo_atendimento_id, usuario_id, cliente_id, aberto) '
            +'VALUES(${atendimento_id}, ${data_inicio},${data_fim},'
            +'${data_fim},${contato},${tipo_acesso},${chamado},${problema},'
            +'${solucao},(select tipo_atendimento_id from tipo_atendimento where descricao=${tipo_atendimento}),'
            +'(select usuario_id from usuario where username=${username}),'
            +'${cnpj},${aberto})', req.body);
        });
    })
    .then(function(data) {
        // data = as returned from the transaction's callback
        console.log(data);
        res.status(200)
        .json({
          status: true,
          data:data,
          message: 'Atualizado com sucesso'
        });
    })
    .catch(function(error) {
        // error
        console.log(error);
        res.status(200)
        .json({
          status: false,
          err:err,
          message: 'Atualizado com sucesso'
        });
    });
}














module.exports = {
  create:create,
  insert:insert
};