// Colors for the cards (make sure each color appears twice)
const colors = [
  'red', 'blue', 'green', 'yellow',
  'purple', 'orange', 'pink', 'cyan',
];
const colorPairs = [...colors, ...colors]; // total 16

// Shuffle the color pairs
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(colorPairs);

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCard(color) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.color = color;

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('matched') || card === firstCard) return;

    card.style.backgroundColor = color;
    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkForMatch();
    }
  });

  gameBoard.appendChild(card);
}

function checkForMatch() {
  lockBoard = true;

  const isMatch = firstCard.dataset.color === secondCard.dataset.color;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.style.backgroundColor = '#999';
      secondCard.style.backgroundColor = '#999';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;

  // Check if all cards matched
  if (document.querySelectorAll('.card.matched').length === colorPairs.length) {
    setTimeout(() => alert("🎉 You matched all the colors!"), 500);
  }
}

// Create all cards
colorPairs.forEach(color => createCard(color));
