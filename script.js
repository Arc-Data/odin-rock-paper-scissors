const pick = ['fa-hand-back-fist', 'fa-hand', 'fa-hand-scissors'];
const cards = document.querySelectorAll('.record-card');
const buttons = document.querySelectorAll('button');
const h1 = document.querySelector('h1');

let round = 0, playerScore = 0, computerScore = 0;

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

function removeRecord(card) {
	while(card.firstChild) {
		card.removeChild(card.lastChild)
	}
}

function generateRecords() {
	h1.textContent = 'Rock, Paper Scissors!'

	cards.forEach( (card, idx) => {
		removeRecord(card);
		card.classList.remove('p-win');
		card.classList.remove('c-win');

		let p = document.createElement('p');
		p.classList.add('record-text');
	 	p.textContent = `Round ${idx + 1}`;
	 	card.appendChild(p);
	})

	round = playerScore = computerScore = 0;
}

function gameEnd() {
	if (round == 5 || playerScore == 3 || computerScore == 3) {
		console.log("Trigger")
		h1.textContent = (playerScore > computerScore) ? 
						"Player wins!" : (playerScore == computerScore) ?
						"Its a draw!" : "Computer Wins";
		return true;
	}

	return false;
}

function playRound(e) {
	
	if(gameEnd() && confirm("Play another round?")) {
		generateRecords();
		return;
	} 

	const roundText = cards[round].firstElementChild;
	const computer = Math.floor(Math.random() * 3);
	const player = Number(e.currentTarget.id);

	generateIcons(player, computer, roundText);

	if (player == computer) {
		roundText.textContent = "==";
	} else if (	(player == 0 && computer == 2) ||
				(player == 1 && computer == 0) || 
				(player == 2 && computer == 1) ) {
		roundText.textContent = ">";
		cards[round].classList.add('p-win')
		playerScore++;
	} else {
		roundText.textContent = '<';
		cards[round].classList.add('c-win')
		computerScore++;
	}

	round++;
	if(gameEnd()) {
		console.log("Should end so why");
	} else {
		h1.textContent = playerScore + " : " + computerScore;
	}

}


buttons.forEach( button => {
	button.addEventListener('click', playRound, {
		capture:true
	});
})

generateRecords();