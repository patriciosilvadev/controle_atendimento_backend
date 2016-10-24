var db = require('../database/postgresqlDB');

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
/**
 * Insere na tabela atendimento
 */
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
           req.body.data_inicio= new Date();
           console.log(new Date());
            return t.none('INSERT INTO atendimento(data_inicio,'
            +'contato, tipo_acesso, chamado, problema, solucao, '
            +'tipo_atendimento_id, usuario_id, cliente_id, aberto) '
            +'VALUES(${data_inicio},'
            +'${contato},${tipo_acesso},${chamado},${problema},'
            +'${solucao},(select tipo_atendimento_id from tipo_atendimento where descricao=${tipo_atendimento}),'
            +'${userId},'
            +'${cnpj},false)', req.body);
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
        next(error);
    });
}














module.exports = {
  create:create,
  insert:insert
};