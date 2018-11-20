var wordList= ["chrome", "firefox", "javascript", "jquery", "twitter", "github", "wordpress", "opera", "sass", "layout", "standards", "semantic", "designer", "developer", "module", "component", "website", "creative", "banner", "browser", "screen", "mobile", "footer", "header", "typography", "responsive", "programmer", "css", "border", "compass", "grunt", "pixel", "document", "object", "ruby", "bootstrap", "python", "php", "pattern", "ajax", "node", "element", "android", "application", "adobe", "apple", "google", "microsoft", "bookmark", "internet", "icon", "svg", "background", "property", "syntax", "flash", "html", "font", "blog", "network", "server", "content", "database", "socket", "function", "variable", "link", "apache", "query", "proxy", "backbone", "angular", "email", "underscore", "cloud"];
var letters=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var userguess;
var winflag=true,lossflag=true;


//Game object
game = {
   
    word:[],
    wordflag:[],
    answerArray:[],
    guessedletters:[],
    remainingLetters:0,
    totalnoofGuess:0,
    wins:0,
    losses:0,
   
     // Pick a random word
    pickword: function() {
         this.word = wordList[Math.floor(Math.random() * wordList.length)];
         this.remainingLetters=this.word.length;
         },
     //Set an Answer Array
    setansarray: function(){
    for (var j = 0; j < this.word.length; j++) {
        this.answerArray[j] = "_";
        this.wordflag[j]="false";
        }
        this.totalnoofGuess=0;
    },
};

function wordGuess(userg){

    while ((game.remainingLetters>0)&&(game.totalnoofGuess<15))
    {
    
    
    for(i=0;i<game.word.length;i++)
    {
            
            if((game.word[i]===userg)&&(game.wordflag[i]==="false"))
            {
               
                game.answerArray[i] = userg;
                game.wordflag[i]="true";
                game.remainingLetters--;
            }
    }
    
    break;
    winflag=true;
    lossflag=true;
    }
    userop();

    //User guessed the correct word
    if(game.remainingLetters===0)
    {   
        document.getElementById("wintext").style="display:block";
        userop();
        var html =
          "<p>Good job! The answer was :  " + game.word + "</p>";
          document.querySelector("#wintext").innerHTML = html;
    
        //Play audio after correct guess
        if(winflag===true)
        {
        var audio = new Audio('assets/Audio/winaudio.wav');
        audio.play();
        game.wins++;
        winflag=false;
        }
        document.getElementById("wordgame").style="display:none";
        }

    // User unable to guess the word
    else if (game.totalnoofGuess>=15){
        document.getElementById("wintext").style="display:block";
        var html =
          "<p>Attemps exceeded the answer was :  " + game.word + "</p>";
          document.querySelector("#wintext").innerHTML = html;

        //Play audio after wrong guess
        if(lossflag===true)
        {
        var audio = new Audio('assets/Audio/looseaudio.wav');
        audio.play();
        game.losses++;
        lossflag=false;
        }
        userop();
        document.getElementById("wordgame").style="display:none"

    }
     
}

function userop()
{
var html =
          "<p>You Guessed: " + userguess + "</p>" +
          "<p> Word :" + game.answerArray + "</p>" +
          "<p>totalguesses: " + game.totalnoofGuess + "</p>" +
          "<p>Total Wins: " + game.wins + "</p>"+
          "<p>Total losses: " + game.losses + "</p>"+
          "<p>Guessed Letters: " + game.guessedletters + "</p>" ;
          

        // Set the inner HTML contents of the #user-guess div to our html string
        document.querySelector("#user-guess").innerHTML = html;
}

document.onkeyup = function(event) {
    userguess=event.key;
    if(letters.includes(userguess))
    {
        if(!(game.guessedletters.includes(userguess)))
        {
            game.guessedletters.push(userguess);
            game.totalnoofGuess++;
        }
    wordGuess(userguess);
    }

}

//continue playing game
function playagain()
{
    winflag=true;
    lossflag=true;
    while(game.answerArray.length>0)
    {
        game.answerArray.pop();
    }
    while(game.guessedletters.length>0)
    {
        game.guessedletters.pop();
    }
    game.pickword();
    game.setansarray();   
    userop();
    document.getElementById("wintext").style="display:none";
    document.getElementById("wordgame").style="display:block";
}

//Start the game
function startplay()
{
    var html =
          "<p>Enter a letter !" +"</p>" +
          "<p>Hint: words are web related." + "</p>";
          
          document.querySelector("#user-text").innerHTML = html;
          game.pickword();
          game.setansarray();   
          userop();
          document.getElementById("btnstart").style="display:none";
          document.getElementById("btn").style="visibility:visible";
} 