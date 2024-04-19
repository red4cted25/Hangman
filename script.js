function startGame() {
    document.getElementById('game').style.visibility = 'visible';
}
$(function() {
    // Array of words for the game
    let words = ['Alex', 'Elliott', 'Harvey', 'Sam', 'Sebastian', 'Shane', 'Abigail', 'Emily', 'Haley', 'Leah', 'Maru', 'Penny', 'Caroline', 'Clint', 'Demetrius', 'Dwarf', 'Evelyn', 'George', 'Gus', 'Jas', 'Jodi', 'Kent', 'Krobus', 'Leo', 'Lewis', 'Linus', 'Marnie', 'Pam', 'Pierre', 'Robin', 'Sandy', 'Vincent', 'Willy', 'Wizard', 'Birdie', 'Gil', 'Governor', 'Grandpa', 'Gunther', 'Marlon', 'Morris']

    // Choose random word using index
    let chosenWord = words[Math.floor(Math.random()*words.length)];
    let guessedLetters = [];
    let remainingGuesses = 6;

    // Display underscores for each letter of the chosen word
    for(let i = 0; i < chosenWord.length; i++) {
        $('#word-container').append('<div class="hidden-letter">_</div>');
    }

    // Function to update the display of the guessed letters
    function updateGuesses() {
        $('#guess-container').empty()
        $('#guess-container').text("Guessed Letters: " + guessedLetters.join(", "));
    }

    // Function to check if the guess letter is in the chosen word
    function checkGuess(letter) {
        if(chosenWord.indexOf(letter) === -1) {
            remainingGuesses--;
            $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
        } else {
            //Reveal the guessed letter
            $('.hidden-letter').each(function(index) {
                if(chosenWord[index] === letter) {
                    $(this).text(letter)
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    // Function to check if the game as been won or lost
    function checkGameStatus() {
        if($('.hidden-letter:contains("_")').length === 0) {
            alert('Congratulations! You Won!')
            resetGame()
        } else if(remainingGuesses === 0) {
            alert('You lost. Try Again! The word was: ' + chosenWord)
            resetGame()
        }
    }

    // Function to reset the game
    function resetGame() {
        guessedLetters = [];
        remainingGuesses = 6;
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random()*words.length)];
        for(let i = 0; i < chosenWord.length; i++) {
            $('#word-container').append('<div class="hidden-letter">_</div>');
        }
        updateGuesses();
    }

    //Event handler for key presses
    $(document).keypress(function(event) {
        let letter = String.fromCharCode(event.which).toLowerCase();
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    })

    //Event handler for the reset button
    $('#reset-button').click(function() {
        resetGame();
    })

    // Initial display of remaining guesses
    $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
})

// Design settings menu
// with difficulty and background changes
// Design animation