function startGame() {
    document.getElementById('game').style.visibility = 'visible';
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('title').style.visibility = 'hidden';
}
let junimoMarchCount = 0;

$(document).ready(function(){
    //Array of words for the game
    var words = ['Alex', 'Elliott', 'Harvey', 'Sam', 'Sebastian', 'Shane', 'Abigail', 'Emily', 'Haley', 'Leah', 'Maru', 'Penny', 'Caroline', 'Clint', 'Demetrius', 'Dwarf', 'Evelyn', 'George', 'Gus', 'Jas', 'Jodi', 'Kent', 'Krobus', 'Leo', 'Lewis', 'Linus', 'Marnie', 'Pam', 'Pierre', 'Robin', 'Sandy', 'Vincent', 'Willy', 'Wizard', 'Birdie', 'Gil', 'Governor', 'Grandpa', 'Gunther', 'Marlon', 'Morris']

    //Choose random word using index
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters= []
    var remainingGuesses = 6

    // Display underscores for each letter of the chosen word
    for(var i=0;i< chosenWord.length;i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    //Function to update the display of the guessed letters
    function updateGuesses(){
        $('#guess-container').empty()
        $('#guess-container').text("Guessed Letters: " + guessedLetters.join(', '))
    }

    //Function to check if the guess letter is in the chosen word
    function checkGuess(letter){
        if(chosenWord.toLowerCase().indexOf(letter) === -1){
            remainingGuesses--
            $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
            junimoMarch()
        }else {
            //Reveal the guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord.toLowerCase()[index] === letter){
                    $(this).text(letter)
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    //function to check if the game has been won or lost
    function checkGameStatus(){
        if($('.hidden-letter:contains("_")').length ===0){
            setTimeout(alert.bind(null, 'Congratulations! You Won!'));
            resetGame()
        }else if(remainingGuesses === 0){
            setTimeout(alert.bind(null, "You Lose! Try Again! The Word Was: " + chosenWord));
            resetGame()
        }
    }

    //Function to reset the game
    function resetGame(){
        guessedLetters = []
        remainingGuesses = 6
        $('#remaining-guesses').text('Remaining Guesses: '+ remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random() * words.length)];
        for(var i=0;i< chosenWord.length;i++){
            $('#word-container').append('<div class="hidden-letter">_</div>')
        }
        updateGuesses()
    }

    //Event handler for key presses
    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase()
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter)
            checkGuess(letter)
        }
    })

    //Event handler for the reset button
    $('#reset-button').click(function(){
        resetGame()
    })

    // Initial display of remaining guesses
    $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
    function junimoMarch() {
        junimoMarchCount++;
        if(junimoMarchCount == 1) {
            $('#junimo-1').style.visibility = "visible";
            $('#junimo-1').hide().fadeTo(1000, 1)
            $('#junimo-1').animate({
                "top": ""
            })
        }
    }
})

// Design settings menu
// with difficulty and background changes
// Design animation