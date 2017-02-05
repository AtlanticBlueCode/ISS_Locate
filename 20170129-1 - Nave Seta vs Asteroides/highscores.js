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


function writePlayerScore(Player, Score) {

    // Obter a Data e Hora
    var Moment = new Date().toISOString().substr(0, 19).replace('T', ' @ ');

    // Registo que se pretende adicionar à BD em formato JSON    
    var record = {
        player: Player,
        score: Score,
        time: Moment
    }

    // Local na BD onde quero guardar o registo (depende da forma como quero estruturar a BD)
    var entry = database.ref('Players/')

    // Guardar o registo
    // usando o 'set' ele esmaga um existente ou cria novo se nao existe ainda
    // usando o 'push' ele adiciona um novo à BD
    entry.push(record);

    console.log ("Score Logged!")

}


// funcao callback que activa as funções 'gotData' ou 'errData' sempre que há uma alteração 'value' na BD abaixo do ramo 'Players'
database.ref('Players/').on('value', gotDataPlayers, errorDataPlayers);

// funcao 'gotData' recupera snapshot da BD abaixo de 'Players' e devolve-a como "Object" e como "Array de Objectos" 
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

function errorDataPlayers(error) {
    console.log("Error!");
    console.log(error);
}


function displayScores() {

    // Fundo Branco para zona dos HighScores    
    context.fillStyle = 'rgba(255, 255, 255,1)'; // zona para dados sobre a particula com fundo 100% limpo (opacity 1)
    context.fillRect(width-400, 0,width , 200); //limpar bem zona de dados  

    // Cabeçalho
    context.fillStyle = 'darkblue';
    context.font = "15px Arial";

    context.fillText('Rank', width-400, 20 );
    context.fillText('Player', width-400+75, 20 );
    context.fillText('Score', width-400+150, 20 );
    context.fillText('Date / Time', width-400+225, 20 );

    // Pontuações Top 10 Ranked por Score
    context.font = "10px Arial";

    var SortedDataPlayersArray = DataPlayersArray.sort(function (a, b) {return b.score - a.score});

    var topDisplay = Math.min(SortedDataPlayersArray.length, 10);
    
    for (var i = 0; i <topDisplay; i++) {
        context.fillText(i+1, width-400, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].player, width-400+75, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].score, width-400+150, 40 + i * 10);
        context.fillText(SortedDataPlayersArray[i].time, width-400+225, 40 + i * 10);
    }

    // Pontuação do Último da BD   
    context.fillText(SortedDataPlayersArray.length, width-400, 40 + topDisplay * 10 +10);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].player, width-400+75, 40 +  topDisplay * 10 +10);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].score, width-400+150, 40 +  topDisplay * 10 +10);
    context.fillText(SortedDataPlayersArray[SortedDataPlayersArray.length-1].time, width-400+225, 40 +  topDisplay * 10 +10);    
};
