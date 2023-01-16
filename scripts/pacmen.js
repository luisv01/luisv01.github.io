var pos = 0;
const pacArray = [
  ['./PacMenExercise/PacMan1.png', './PacMenExercise/PacMan2.png'],
  ['./PacMenExercise/PacMan3.png', './PacMenExercise/PacMan4.png'],
];
var direction = 0;
var focus = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.floor(Math.random() * scale),
    y: Math.floor(Math.random() * scale),
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './PacMenExercise/PacMan1.png';
  newimg.classList.add('pacmen');

  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    focus = (focus + 1) % 2;
    item.newimg.src = pacArray[direction][focus];
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
    // direction = 0;
    direction = (direction + 1) % 2;
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
    // direction = 1;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

function reset() {
  const clearGame = document.querySelectorAll('.pacmen');
  clearGame.forEach((e) => e.remove());
}
