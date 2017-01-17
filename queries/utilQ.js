var utilModel = {};
var debug = require('debug')('utilQ');


utilModel.getDates = function(ano,mes,dia){
    
    var returnDates= {};

    //ano
    returnDates.ano_inicio=new Date(ano,0,1)
    returnDates.ano_fim=new Date(ano+1,0,0);

    //mes
    returnDates.mes_inicio=new Date(ano,mes,1)
    returnDates.mes_fim=new Date(ano,mes+1,0);

    //semana
    var semana=new Date(ano,mes,dia);
    returnDates.semana_inicio=new Date(ano,mes,semana.getDate()-semana.getDay());
    returnDates.semana_fim=new Date(returnDates.semana_inicio.getFullYear(),returnDates.semana_inicio.getMonth(),returnDates.semana_inicio.getDate()+6);

    debug('As datas de pesquisa sao: '
    +'\n Ano= %s - %s'
    +'\n Mes= %s - %s'
    +'\n Semana= %s - %s',returnDates.ano_inicio,returnDates.ano_fim,returnDates.mes_inicio,returnDates.mes_fim,returnDates.semana_inicio,returnDates.semana_fim);

    return returnDates;


};



module.exports=utilModel;

