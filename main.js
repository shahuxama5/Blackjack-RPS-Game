//Age In Days

function ageInDays() {
    var birthYear = prompt("What year were you born ?");
    var ageInDayss = (2022 - birthYear) * 365 ;
    var h1 = document.createElement('h1');
    var answer = document.createTextNode('You are '+ ageInDayss +' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(answer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetDays() {
    document.getElementById('ageInDays').remove();
}

//Cat Generator

function catGenerator() {
    var image = document.createElement('img');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    var div1 = document.createElement('div');
    var divId = document.getElementById('cat-gen-flex');
    divId.appendChild(div1);
    div1.appendChild(image);
}

// Rock, Paper, Scissor Game

function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numToChoice(randomNum());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randomNum(){
    return Math.floor(Math.random()*3)
}

function numToChoice(num){
    return ['rock','paper','scissor'][num];
}

function decideWinner(humanChoice, botChoice){
    var rpsData = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissor': 0, 'rock': 1, 'paper': 0.5},
        'scissor': {'scissor': 0.5, 'rock': 0, 'paper': 1},
    };
    var yourScore = rpsData[humanChoice][botChoice];
    var botScore = rpsData[botChoice][humanChoice];
    return [yourScore, botScore];
}

function finalMessage([yourScore]){
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color':'red'};
    }
    else if (yourScore === 1) {
        return {'message': 'You won!', 'color':'green'};
    }
    else {
        return {'message': 'You tied', 'color':'yellow'};
    }
}

function rpsFrontEnd(humanImgChoice, botImgChoice, finalMessage){
    var imageData = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    humanDiv.innerHTML = "<img src='"+ imageData[humanImgChoice] +"' height=200 width=200 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"
    messageDiv.innerHTML = "<h1 style='color: "+ finalMessage['color'] +"; font-size: 60px; padding: 30px; '>" +finalMessage['message']+ "</h1>"
    botDiv.innerHTML = "<img src='"+ imageData[botImgChoice] +"' height=200 width=200 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"
    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
}

// Change the color of buttons

var allButtons = document.getElementsByTagName('button');
var copyAllButtons = [];

for (let i=0; i < allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    }
    else if (buttonThingy.value === 'blue'){
        buttonsBlue();
    }
    else if (buttonThingy.value === 'green'){
        buttonsGreen();
    }
    else if (buttonThingy.value === 'random'){
        buttonsRandom();
    }
    else if (buttonThingy.value === 'reset'){
        buttonsReset();
    }
}

function buttonsRed(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsBlue(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-primary');
    }
}

function buttonsGreen(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonsReset(){
    for (let i=0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    let choices = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning', ' btn-secondary'];
    for (let i=0; i < allButtons.length; i++){
        let randNum = Math.floor(Math.random()*5) ;
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randNum]);
    }
}

// Blackjack

let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardMaps': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws' : 0,
    'isStand': false,
    'turnsOver': false,
};
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');


document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `img/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i = 0; i < yourImages.length; i++ ){
        yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++ ){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackGame['turnsOver'] = false;
    }
}

function updateScore (card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardMaps'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardMaps'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardMaps'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardMaps'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner); 
}

function computeWinner () {
    let winner;
    if (YOU['score'] <= 21){
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            winner = YOU;
            blackjackGame['wins']++;
        }
        else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
            blackjackGame['losses']++;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses']++;
    }
    else if (YOU['score'] > 21 && YOU['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult (winner) {
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true) { 
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'blue';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

// AJAX and APIs

const url = 'https://randomuser.me/api/?results=10';
fetch(url).then(resp => resp.json()).then(data => {
    let authors = data.results;
    for (i = 0; i < authors.length; i++)
    {
        let div = document.createElement('div');
        let image = document.createElement('img');
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
        image.src = authors[i].picture.large;
        div.appendChild(image);
        div.appendChild(p);
        document.querySelector('.flex-ajax').appendChild(div);
    }
});








