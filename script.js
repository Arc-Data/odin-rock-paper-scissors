const pick = ['fa-hand-back-fist', 'fa-hand', 'fa-hand-scissors'];

const cards = document.querySelectorAll('.record-card');
const buttons = document.querySelectorAll('button');
let round = 0, playerWin = 0, computerWin = 0;
let gameHasWinner = false;

console.log()

function generateIcons(player, computer, roundText) {
	console.log(pick, player, computer)

	const playerIcon = document.createElement('i');
	playerIcon.classList.add('icon')
	playerIcon.classList.add('fa-solid')
	playerIcon.classList.add(pick[player])
	cards[round].insertBefore(playerIcon, roundText);

	const computerIcon = document.createElement('i');
	computerIcon.classList.add('icon');
	computerIcon.classList.add('fa-solid');
	computerIcon.classList.add(pick[computer])
	cards[round].appendChild(computerIcon)
}

function playRound(e) {
	console.log(e.target.id)
	if(round > 5 || playerWin == 3 || computerWin == 3) return;
	
	const roundText = cards[round].firstElementChild;
	const computer = Math.floor(Math.random() * 3);
	const player = Number(e.target.id);

	generateIcons(player, computer, roundText);

	if(player == computer) {
		roundText.textContent = "Draw!";
	} else if(	(player == 0 && computer == 2) ||
				(player == 1 && computer == 0) || 
				(player == 2 && computer == 1) ) {
		roundText.textContent = "Player Wins!";
		cards[round].classList.add('p-win')
		playerWin++;
	} else {
		roundText.textContent = 'Computer Wins!';
		cards[round].classList.add('c-win')
		computerWin++;
	}

	round++;
	
	if(playerWin == 3 || computerWin == 3) {
		for(round; round < 5; round++) {
			cards[round].style.background = 'black';
			cards[round].style.color = 'black';
			cards[round].firstElementChild.textContent = '#'
			cards[round].opacity = '0.2'
		}
	}
	
}


buttons.forEach( button => {
	button.addEventListener('click', playRound);
})