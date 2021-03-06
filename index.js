var colors = require('colors');
var fs = require('fs');

module.exports = function(logLevel,logDirectory,logName){

    var module = {};
    
    var now = new Date();
    var fileName = logName || now.getDate()+'-'+now.getMonth()+'-'+now.getYear()+';'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'.html';
    var folder = __dirname+'/logs';
    var stream = null;

    if (logLevel && (logLevel != 'none') && (logLevel != 'normal') && (logLevel != 'debug'))
        throw new Error('logLevel not defined'); 
    if (logDirectory)
        folder = logDirectory;

    try {
        fs.mkdirSync(folder);
        openLog();
    } catch(err) {
        if (err.code == 'EEXIST') 
            openLog();
        else
            throw err;
    }

    module.log = function(message){
        if ((logLevel == 'normal')||(logLevel == 'debug'))
            console.log(message);
        stream.write("<p style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");         
    }
    module.warning = function(message){
        if (logLevel == 'debug')
            console.log(message.yellow);
        stream.write("<p class='text-warning' style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");
    }
    module.success = function(message){
        if (logLevel == 'debug')
            console.log(message.green);
        stream.write("<p class='text-success' style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");
    }
    module.error = function(message){
        if (logLevel == 'debug')
            console.log(message.red);
        stream.write("<p class='text-danger' style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");
    }
    module.important = function(message){
        console.log(message.black.bgWhite);
        stream.write("<p class='text-primary' style='font-size:18px;margin-bottom:0px;'><strong>"+message+"</strong></p>");
    }
    module.close = function(){
        stream.write("</div></div></html>");
        stream.end();
        fs.chmodSync(folder+'/'+fileName,'0775')
    }

    process.on('SIGINT', function () {
        module.close();
        process.exit();
    });
    
    function openLog(){
        stream = fs.createWriteStream(folder+'/'+fileName, { flags : 'w+' });
        stream.write("<html>");
        stream.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>");
        stream.write("<link rel='stylesheet' href='ttps://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css'>");
        stream.write("<div class='container text-center'><h2 clas='text-center'>Log started on "+now.getDate()+'/'+now.getMonth()+'/'+now.getYear()+' on hour '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"</h2><br><div class='jumbotron text-left'>"); 
    }
    
    return module;
}