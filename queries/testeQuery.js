var db = require('../database/postgresqlDB');


function create(req, res, next) {


















  
  db.oneOrNone("Select id from nome where nome=$1",['tchau'])
  .then(function(data){
       if(data==null){
         db.none('insert into nome(nome)' +
            'values($1)',['tchau'])
          .then(function () {
            insertSobrenome().then(function(){
                    res.status(200)
                    .json({
                      status: 'success',
                      message: 'Inserido com muito sucesso'
                    });
            }).catch(function(err){
              res.status(200)
                    .json({
                      status: 'success',
                      message: 'Inserido com muito sucesso',
                      data:err
                    });
            });
          })
       }else{
              res.status(200)
                    .json({
                      status: 'success',
                      message: 'else'
                    });

       }
  }).catch(function(err){
                  res.status(200)
                    .json({
                      status: 'success',
                      message: 'catch',
                      data:err
                    });
  });
}


module.exports = {
  create:create,
  getAll:create
}