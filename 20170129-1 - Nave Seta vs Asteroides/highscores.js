// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_qypmifB3rUimctTv6QfCN5Mujcl7u8U",
    authDomain: "asteroids-high-score-board.firebaseapp.com",
    databaseURL: "https://asteroids-high-score-board.firebaseio.com",
    storageBucket: "asteroids-high-score-board.appspot.com",
    messagingSenderId: "596371583175"
};

firebase.initializeApp(config);


// Get a reference to the database service
var database = firebase.database();


// Obter Pais e Regiao através do ip-api.com
function CountryFromIP(json) {
    // Obter Pais e Regiao
    Country = json.country;
    Region = json.regionName;
    console.log(Country);
    console.log(Region);
}  


function writePlayerScore(Player, Score) {

    // Obter a Data e Hora
    var Moment = new Date().toISOString().substr(0, 19).replace('T', ' @ ');

    // Registo que se pretende adicionar à BD em formato JSON    
    LatestRecord = {
        player: Player,
        score: Score,
        time: Moment,
        country: Country,
        region: Region
    }

    // Local na BD onde quero guardar o registo (depende da forma como quero estruturar a BD)
    var entry = database.ref('Players/')

    // Guardar o registo
    // usando o 'set' ele esmaga um existente ou cria novo se nao existe ainda
    // usando o 'push' ele adiciona um novo à BD
    entry.push(LatestRecord);
    
    console.log ("Score Logged!")
}

// funcao callback que activa a função 'gotDataPlayers' sempre que há uma alteração 'value' na BD abaixo do ramo 'Players'
database.ref('Players/').on('value', gotDataPlayers);

// funcao 'gotDataPlayers' recupera snapshot da BD abaixo de 'Players' e devolve-a como "Object" e como "Array de Objectos" 
function gotDataPlayers(data) {
    // Object com a snapshot dos dados
    var DataPlayersObject = data.val();
    console.log(DataPlayersObject);

    // Conversao do Object em Array com a snapshot dos dados
    DataPlayersArray = Object.keys(DataPlayersObject).map(x=>DataPlayersObject[x]);
    console.log(DataPlayersArray);

    // Activação de função específica para mostrar os dados que se pretende
    if (GameOver == true) {
        displayScores();
    };
}


function displayScores() {

    // Fundo Branco para zona dos HighScores    
    context.fillStyle = 'rgba(255, 255, 255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(width-500, 0,width , 200); //limpar bem zona de dados  

    // Cabeçalho
    context.fillStyle = 'darkblue';
    context.font = "15px Arial";

    var PlayerStart = 50;    
    var CountryStart = 110;    
    var ScoreStart = 245;    
    var DateTimeStart = 300;    
    
    context.fillText('Rank', width-500, 20 );
    context.fillText('Player', width-500+PlayerStart, 20 );
    context.fillText('Country', width-500+CountryStart, 20 );
    context.fillText('Score', width-500+ScoreStart, 20 );
    context.fillText('Date / Time', width-500+DateTimeStart, 20 );

    // Pontuações Top 10 Ranked por Score
    context.font = "10px Arial";

    var SortedDataPlayersArray = DataPlayersArray.sort(function (a, b) {return b.score - a.score});

    var topDisplay = Math.min(SortedDataPlayersArray.length, 10);
    
    for (var i = 0; i <topDisplay; i++) {
        context.fillText(i+1, width-500, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].player, width-500+PlayerStart, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].country+' - '+SortedDataPlayersArray[i].region, width-500+CountryStart, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].score, width-500+ScoreStart, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].time, width-500+DateTimeStart, 40 + i * 10);
    }

    for (var i = 0; i < SortedDataPlayersArray.length; i++) {
        if (SortedDataPlayersArray[i].time == LatestRecord.time) { LatestRecordIndex = i+1 };
    }
    console.log(LatestRecordIndex)
    
    // Pontuação deste jogo   
    context.fillText(LatestRecordIndex, width-500, 40 + topDisplay * 10 +10);
    context.fillText(LatestRecord.player, width-500+PlayerStart, 40 +  topDisplay * 10 +10);
    context.fillText(LatestRecord.country+' - '+LatestRecord.region, width-500+CountryStart, 40 +  topDisplay * 10 +10);
    context.fillText(LatestRecord.score, width-500+ScoreStart, 40 +  topDisplay * 10 +10);
    context.fillText(LatestRecord.time, width-500+DateTimeStart, 40 +  topDisplay * 10 +10);    
    
    // Pontuação do Último da BD   
    context.fillText(SortedDataPlayersArray.length, width-500, 40 + topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].player, width-500+PlayerStart, 40 +  topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].country+' - '+SortedDataPlayersArray[SortedDataPlayersArray.length-1].region, width-500+CountryStart, 40 +  topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].score, width-500+ScoreStart, 40 +  topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].time, width-500+DateTimeStart, 40 +  topDisplay * 10 +30);    
};
