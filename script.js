function startGame() {
    document.getElementById('game').style.visibility = 'visible';
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('title').style.visibility = 'hidden';
}
function setSettings() {
    document.getElementById('settings-panel').style.visibility = 'visible';
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('title').style.visibility = 'hidden';
}

function goHome() {
    document.getElementById('game').style.visibility = 'hidden';
    document.getElementById('settings-panel').style.visibility = 'hidden';
    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('title').style.visibility = 'visible';
}

$(document).ready(function(){
    let words = [];
    checkDifficulty();
    function checkDifficulty(difficulty) {
        switch (difficulty) {
            case 'easy':
                level = difficulty
                words.push('crop', 'silo', 'shed', 'barn', 'pigs', 'coop', 'cows', 'fish', 'lake', 'bush', 'wine', 'seed', 'corn', 'star', 'fall', 'moon', 'luau', 'carp', 'frog', 'rain', 'mine', 'hops');
                break
            case 'medium':
                level = difficulty
                words.push('forest', 'oceans', 'houses', 'jewels', 'leaves', 'trunks', 'slimes', 'market', 'puddle', 'basket', 'summer', 'winter', 'autumn', 'melons', 'carrot', 'coffee', 'garlic', 'potato', 'pepper', 'squash');
                break
            case 'hard':
                level = difficulty
                words.push('Alex', 'Elliott', 'Harvey', 'Sam', 'Sebastian', 'Shane', 'Abigail', 'Emily', 'Haley', 'Leah', 'Maru', 'Penny', 'Caroline', 'Clint', 'Demetrius', 'Dwarf', 'Evelyn', 'George', 'Gus', 'Jas', 'Jodi', 'Kent', 'Krobus', 'Leo', 'Lewis', 'Linus', 'Marnie', 'Pam', 'Pierre', 'Robin', 'Sandy', 'Vincent', 'Willy', 'Wizard', 'Birdie', 'Gil', 'Governor', 'Grandpa', 'Gunther', 'Marlon', 'Morris', 'crop', 'silo', 'shed', 'barn', 'pigs', 'coop', 'cows', 'fish', 'lake', 'bush', 'wine', 'seed', 'corn', 'star', 'fall', 'moon', 'luau', 'carp', 'frog', 'rain', 'mine', 'forest', 'oceans', 'houses', 'jewels', 'leaves', 'trunks', 'slimes', 'market', 'puddle', 'basket', 'summer', 'winter', 'autumn', 'melons', 'carrot', 'coffee', 'garlic', 'potato', 'pepper', 'squash', 'starfruit', 'cabbage', 'radish', 'strawberry', 'hops', 'cauliflower', 'pumpkin', 'powdermelon', 'ancient',  'tea', 'pineapple');
                break
            default:
                level = 'medium';
                words.push('forest', 'oceans', 'houses', 'jewels', 'leaves', 'trunks', 'slimes', 'market', 'puddle', 'basket', 'summer', 'winter', 'autumn', 'melons', 'carrot', 'coffee', 'garlic', 'potato', 'pepper', 'squash');
                break
        }
    }
    //Choose random word using index
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters= []
    var remainingGuesses = 5
    var junimoMarchCount = 0;

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
            // junimoMarch()
            cropFade()
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
        remainingGuesses = 5
        junimoMarchCount = 0
        $('#crop-1').fadeTo(1, 1)
        $('#crop-2').fadeTo(1, 1)
        $('#crop-3').fadeTo(1, 1)
        $('#crop-4').fadeTo(1, 1)
        $('#crop-5').fadeTo(1, 1)
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
    // function junimoMarch() {
    //     junimoMarchCount++;
    //     if(junimoMarchCount == 1) {
    //         $('#junimo-1').style.visibility = "visible";
    //         $('#junimo-1').hide().fadeTo(1000, 1)
    //         $('#junimo-1').animate({
    //             "top": "40%",
    //         })
    //     }
    // }
    function cropFade() {
        junimoMarchCount++;
        if(junimoMarchCount == 1) {
            $('#crop-1').fadeTo(1000, 0)
        }
        if(junimoMarchCount == 2) {
            $('#crop-2').fadeTo(1000, 0)
        }
        if(junimoMarchCount == 3) {
            $('#crop-3').fadeTo(1000, 0)
        }
        if(junimoMarchCount == 4) {
            $('#crop-4').fadeTo(1000, 0)
        }
        if(junimoMarchCount == 5) {
            $('#crop-5').fadeTo(1000, 0)
        }
    }
})

// Design settings menu
// with difficulty and background changes
// Design animation