const canvas = document.getElementById("grille");
const ctx = canvas.getContext("2d");

// Dimensions du canvas
const width = canvas.width;
const height = canvas.height;

const boxSize = 40;

const gameSpeed = 150;

let snake = [
  { x: 4 * boxSize, y: 5 * boxSize } // Position de départ au milieu du canvas
];

let direction = "RIGHT";
let score = 0;


const scoreDisplay = document.getElementById("score");

let game;


function getRandomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (height / boxSize)) * boxSize
  };
}
let food = getRandomFoodPosition();

document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
    const keyPressed = event.key; 
    
    const LEFT = "ArrowLeft";
    const UP = "ArrowUp";
    const RIGHT = "ArrowRight";
    const DOWN = "ArrowDown";
    
    if (keyPressed === LEFT && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (keyPressed === UP && direction !== "DOWN") {
        direction = "UP";
    } else if (keyPressed === RIGHT && direction !== "LEFT") {
        direction = "RIGHT";
    }
    else if (keyPressed === DOWN && direction !== "UP") {
        direction = "DOWN";
    }
}

// Fonction principale du jeu
function gameLoop() {
  let headX = snake[0].x;
  let headY = snake[0].y;
  let section2 = document.getElementById("section2");
    if (direction === "LEFT") headX -= boxSize;
    if (direction === "UP") headY -= boxSize;
    if (direction === "RIGHT") headX += boxSize;
    if (direction === "DOWN") headY += boxSize; 
    // Vérifier les collisions avec les murs
    if (headX < 0 || headX >= width || headY < 0 || headY >= height) {
        clearInterval(game);
        section2.innerHTML = "<h2 style='color: gold; text-align: center;'>Game Over! Votre score: " + score + "</h2> <input type='button' value='Rejouer' onclick='location.reload()' style='display: block; margin: 0 auto; padding: 10px 20px; font-size: 16px; background-color: gold; border: none; border-radius: 5px; cursor: pointer;'>";
        return;
    }
    // Vérifier les collisions avec le corps du serpent
    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            clearInterval(game);
            section2.innerHTML = "<h2 style='color: gold; text-align: center;'>Game Over! Votre score: " + score + "</h2>";
            return;
        }
    }
    // Ajouter la nouvelle tête au début du tableau du serpent
    snake.unshift({ x: headX, y: headY });

    // Vérifier si le serpent a mangé la nourriture
    if (headX === food.x && headY === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = getRandomFoodPosition();
    } else {
        // Retirer le dernier segment du serpent (il se déplace)
        snake.pop();
    }


    ctx.clearRect(0, 0, width, height);


    const Google = new Image();
    Google.src = 'images/google.png';
    const Apple = new Image();
    Apple.src = 'images/apple.png';
    const Facebook = new Image();
    Facebook.src = 'images/facebook.png';
    const Amazon = new Image();
    Amazon.src = 'images/amazon.png';
    const Microsoft = new Image();
    Microsoft.src = 'images/microsoft.png';

    Liste = [Google, Apple, Facebook, Amazon, Microsoft];
    let logo = Liste[Math.floor(Math.random() * Liste.length)];
    ctx.drawImage(logo, food.x, food.y, boxSize, boxSize);


    // Dessiner le serpent
    
    
    const bee = new Image();
    bee.src = 'images/bee.png';
    for (let segment of snake) {
        ctx.drawImage(bee, segment.x, segment.y, boxSize, boxSize);
    }
}   

// Démarrer le jeu
game = setInterval(gameLoop, gameSpeed);



