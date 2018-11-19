var wordList= ["chrome", "firefox","internet","google","web","apple","twitter","gmail","android"];
var letters=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var  flag=true;
var userguess;


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
    
    console.log(userg);
    console.log("flag  :" +flag);
    if (flag){
        game.pickword();
        console.log("word  :" + game.word);
        console.log("remainingLetters  :" + game.remainingLetters);
        game.setansarray();
        console.log("answerArray  :" + game.answerArray);
    }
    flag=false;
    console.log("flag  :" +flag);
    
    while ((game.remainingLetters>=0)&&(game.totalnoofGuess<20))
    {
    
    game.totalnoofGuess++;
    console.log("totalnoofGuess  :" + game.totalnoofGuess);
   
    for(i=0;i<game.word.length;i++)
    {
            
            if((game.word[i]===userg)&&(game.wordflag[i]==="false"))
            {
               
                game.answerArray[i] = userg;
                game.wordflag[i]="true";
                console.log(game.answerArray);
                userop();
                game.remainingLetters--;
            }
            
            userop();
            }
    
    break;
}
    if(game.remainingLetters===0)
    {
        alert(game.answerArray.join(" "));
        alert("Good job! The answer was " +game.word);
        flag=true;
        game.wins++;
        userop();
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
    }
    else if (game.totalnoofGuess>=20){
        alert("attemps exceeded the answer was " + game.word);
        game.losses++;
        userop();
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
           
    }
     
}

function userop()
{
var html =
          "<p>You chose: " + userguess + "</p>" +
          "<p>" + game.answerArray + "</p>" +
          "<p>totalguesses: " + game.totalnoofGuess + "</p>" +
          "<p>Total Wins: " + game.wins + "</p>"+
          "<p>Total losses: " + game.losses + "</p>"+
          "<p>Guessed Letters: " + game.guessedletters + "</p>" ;
          

        // Set the inner HTML contents of the #user-guess div to our html string
        document.querySelector("#user-guess").innerHTML = html;
}

document.onkeyup = function(event) {
    userguess=event.key;
    if(!(game.guessedletters.includes(userguess)))
    game.guessedletters.push(userguess);
    if(letters.includes(userguess))
    wordGuess(userguess);
}