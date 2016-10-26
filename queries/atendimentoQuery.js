var db = require('../database/postgresqlDB');

function all(req, res, next){
  db.any("SELECT * FROM ATENDIMENTO "
  +"CROSS JOIN CLIENTE, tipo_atendimento "+
  "WHERE CLIENTE.CNPJ=ATENDIMENTO.cliente_id "
  +"AND ATENDIMENTO.tipo_atendimento_id=tipo_atendimento.tipo_atendimento_id "
  +"ORDER BY aberto DESC, data_inicio ASC")
  .then(function(data){
        res.status(200)
        .json(data);
    })
    .catch(function(err){
      next(err);
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
  all:all,
  insert:insert
};