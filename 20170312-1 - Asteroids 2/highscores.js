// Initialize Firebase
var FirebaseConfig = {
    apiKey: "AIzaSyC_qypmifB3rUimctTv6QfCN5Mujcl7u8U",
    authDomain: "asteroids-high-score-board.firebaseapp.com",
    databaseURL: "https://asteroids-high-score-board.firebaseio.com",
    storageBucket: "asteroids-high-score-board.appspot.com",
    messagingSenderId: "596371583175"
};

firebase.initializeApp(FirebaseConfig);


// Get a reference to the database service
var database = firebase.database();

var Country;
var Region;

// Obter Pais e Regiao através do ip-api.com
function CountryFromIP (json) {
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
        country: Country || "Not Available",
        region: Region||"Not Available"
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
}


function displayScores() {

    var FromLeft = 450;    
    var PlayerStart = 50;    
    var CountryStart = 110;    
    var ScoreStart = 245;    
    var DateTimeStart = 300;    
    
    // Fundo para zona dos HighScores    
    context.fillStyle = 'rgba(255, 255, 255,0)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(width-500, 0,width , 200); //limpar bem zona de dados  

    // Cabeçalho
    context.fillStyle = 'white';
    context.font = "15px Arial";

    context.fillText('Rank', width-FromLeft, 20 );
    context.fillText('Player', width-FromLeft+PlayerStart, 20 );
    context.fillText('Country', width-FromLeft+CountryStart, 20 );
    context.fillText('Score', width-FromLeft+ScoreStart, 20 );
    context.fillText('Date / Time', width-FromLeft+DateTimeStart, 20 );


    // Pontuações Top 10 Ranked por Score
    context.font = "10px Arial";

    var SortedDataPlayersArray = DataPlayersArray.sort(function (a, b) { return b.score- a.score});
    var topDisplay = Math.min(SortedDataPlayersArray.length, 10);
    for (var i = 0; i <topDisplay; i++) {
        context.fillText(i+1, width-FromLeft, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].player, width-FromLeft+PlayerStart, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].country+' - '+SortedDataPlayersArray[i].region, width-FromLeft+CountryStart, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].score, width-FromLeft+ScoreStart, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].time, width-FromLeft+DateTimeStart, 40 + i * 10);
    }
    
    // Pontuação deste jogo
    for (var i = 0; i < SortedDataPlayersArray.length; i++) {
        if (SortedDataPlayersArray[i].time == LatestRecord.time) { LatestRecordIndex = i+1 };
    }
    console.log(LatestRecordIndex);
    context.fillText(LatestRecordIndex, width - FromLeft, 40 + topDisplay * 10 + 10);
    context.fillText(LatestRecord.player, width-FromLeft+PlayerStart, 40 +  topDisplay * 10 +10);
    context.fillText(LatestRecord.country+' - '+LatestRecord.region, width-FromLeft+CountryStart, 40 +  topDisplay * 10 +10);
    context.fillText(LatestRecord.score, width-FromLeft+ScoreStart, 40 +  topDisplay * 10 +10);
    context.fillText(LatestRecord.time, width-FromLeft+DateTimeStart, 40 +  topDisplay * 10 +10);    

    // Pontuação do Último da BD   
    context.fillText(SortedDataPlayersArray.length, width-FromLeft, 40 + topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].player, width-FromLeft+PlayerStart, 40 +  topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].country+' - '+SortedDataPlayersArray[SortedDataPlayersArray.length-1].region, width-FromLeft+CountryStart, 40 +  topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].score, width-FromLeft+ScoreStart, 40 +  topDisplay * 10 +30);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].time, width-FromLeft+DateTimeStart, 40 +  topDisplay * 10 +30);    
};
