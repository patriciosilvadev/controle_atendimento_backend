

var utilModel = {};

utilModel.getDates = function(ano,mes,dia){
    
    var returnDates= {};

    //ano
    returnDates.ano_inicio=new Date(ano,0,1)
    returnDates.ano_fim=new Date(ano,0,0);

    //mes
    returnDates.mes_inicio=new Date(ano,mes,1)
    returnDates.mes_fim=new Date(ano,mes+1,0);

    //semana
    var semana=new Date(ano,mes,dia);
    returnDates.semana_inicio=new Date(ano,mes,semana.getDate()-semana.getDay());
    returnDates.semana_fim=new Date(ano,mes+1,semana.getDate()+6);

    return returnDates;

};



module.exports=utilModel;

