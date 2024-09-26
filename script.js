let winsPlayer1 = 0;  // Almacena las victorias del Jugador 1
let winsPlayer2 = 0;  // Almacena las victorias del Jugador 2
let gameOver = false;
let remainingChambers = 6;
let bulletPosition;
let currentPlayer = 1;
let isShootingSelf = false;

// Función para girar el tambor
function spinChamber() {
    bulletPosition = Math.floor(Math.random() * remainingChambers) + 1;
}

// Función que determina si el disparo acertó
function playGame() {
    if (gameOver) return;

    const currentShot = Math.floor(Math.random() * remainingChambers) + 1;

    // Verificar si la bala coincide con la posición
    if (currentShot === bulletPosition) {
        if (isShootingSelf) {
            // Si el jugador se dispara a sí mismo y acierta
            document.getElementById('status').textContent = `Jugador ${currentPlayer}: Te disparaste a ti mismo. ¡Perdiste!`;
            document.getElementById('pistolImage').src = "https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin2004/sergeypykhonin200400045/144984244-pistola-en-mano-ilustraci%C3%B3n-de-vector-de-dibujos-animados-de-tirador.jpg";

            // Reproducir el sonido de disparo
            const gunshotSound = document.getElementById('failSound');
            gunshotSound.play();

            // Sumar puntos al jugador sobreviviente
            if (currentPlayer === 1) {
                winsPlayer2++; // Jugador 2 sobrevive
                document.getElementById('scorePlayer2').textContent = winsPlayer2;
            } else {
                winsPlayer1++; // Jugador 1 sobrevive
                document.getElementById('scorePlayer1').textContent = winsPlayer1;
            }
        } else {
            // Si el jugador acierta disparando al rival
            document.getElementById('status').textContent = `Jugador ${currentPlayer}: Disparaste al rival y acertaste. ¡Ganaste!`;
            document.getElementById('pistolImage').src = "https://d2gsh5s6xz2tf4.cloudfront.net/wp-content/uploads/old/files/Dnews/images/detail/237898_237404_dibujosucesosbryan.jpg";

            // Reproducir el sonido de disparo
            const gunshotSound = document.getElementById('failSound');
            gunshotSound.play();

            if (currentPlayer === 1) {
                winsPlayer1++;
                document.getElementById('scorePlayer1').textContent = winsPlayer1;
            } else {
                winsPlayer2++;
                document.getElementById('scorePlayer2').textContent = winsPlayer2;
            }
        }

        gameOver = true;
        document.getElementById('shootRivalBtn').style.display = 'none';
        document.getElementById('shootSelfBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'block';
        document.getElementById('instructionsBtn').style.display = 'none';
    } else {
        // Si el disparo falla
        if (isShootingSelf) {
            // El jugador se disparó a sí mismo pero falló (recompensado con otro turno)
            document.getElementById('status').textContent = `Jugador ${currentPlayer}: Te disparaste, pero sobreviviste. ¡Tienes suerte!`;
            document.getElementById('pistolImage').src = "https://st3.depositphotos.com/3557671/12879/v/950/depositphotos_128797526-stock-illustration-directed-gun-icon-in-cartoon.jpg";

            // Reproducir el sonido de recarga
            const reloadSound = document.getElementById('reloadSound');
            reloadSound.play();

        } else {
            // El jugador disparó al rival pero falló
            document.getElementById('status').textContent = `Jugador ${currentPlayer}: Disparaste al rival, pero fallaste. ¡Cambia de turno!`;
            document.getElementById('pistolImage').src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3t66OenU8iTMK8Y3nrdJiSDsgfBUCLBAckw&s";

            // Reproducir el sonido de recarga
            const reloadSound = document.getElementById('reloadSound');
            reloadSound.play();

            // Cambiar de turno solo si se dispara al rival
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }

        remainingChambers--;

        if (remainingChambers === 0) {
            document.getElementById('status').textContent = '¡Felicidades! Ambos sobrevivieron todos los disparos.';
            gameOver = true;
            document.getElementById('shootRivalBtn').style.display = 'none';
            document.getElementById('shootSelfBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'block';
            document.getElementById('instructionsBtn').style.display = 'none';
        } else {
            bulletPosition = Math.floor(Math.random() * remainingChambers) + 1;
        }
    }
}


// Función para pasar el turno al siguiente jugador
function nextTurn() {
    isShootingSelf = false;
    document.getElementById('status').textContent = `Jugador ${currentPlayer}: Es tu turno.`;
    document.getElementById('shootRivalBtn').style.display = 'block';
    document.getElementById('shootSelfBtn').style.display = 'block';
    document.getElementById('nextTurnBtn').style.display = 'none';
    document.getElementById('instructionsBtn').style.display = 'none';
}

// Función para disparar al rival
function shootRival() {
    isShootingSelf = false;
    playGame();
    if (!gameOver) {
        document.getElementById('shootRivalBtn').style.display = 'none';
        document.getElementById('shootSelfBtn').style.display = 'none';
        document.getElementById('nextTurnBtn').style.display = 'block';
        document.getElementById('instructionsBtn').style.display = 'none';
    }
}

// Función para dispararse a uno mismo
function shootSelf() {
    isShootingSelf = true;
    playGame();
    if (!gameOver) {
        document.getElementById('shootRivalBtn').style.display = 'none';
        document.getElementById('shootSelfBtn').style.display = 'none';
        document.getElementById('nextTurnBtn').style.display = 'block';
        document.getElementById('instructionsBtn').style.display = 'none';
    }
}

// Función para reiniciar el juego
function resetGame() {
    remainingChambers = 6;
    currentPlayer = 1;
    gameOver = false;
    document.getElementById('status').textContent = 'Jugador 1: ¿Estás listo?';
    document.getElementById('shootRivalBtn').style.display = 'block';
    document.getElementById('shootSelfBtn').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('nextTurnBtn').style.display = 'none';
    document.getElementById('instructionsBtn').style.display = 'block';
    document.getElementById('pistolImage').src = "https://png.pngtree.com/png-clipart/20230825/original/pngtree-handgun--pistol-vector-aiming-ammo-picture-image_8469919.png";
    spinChamber();

    // Reiniciar la música si había sido detenida
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

// Mostrar instrucciones
function showInstructions() {
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('instructionsBtn').style.display = 'none';
}

// Cerrar instrucciones
function closeInstructions() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('instructionsBtn').style.display = 'block';
}

// Añadir los event listeners para los botones
document.getElementById('shootRivalBtn').addEventListener('click', shootRival);
document.getElementById('shootSelfBtn').addEventListener('click', shootSelf);
document.getElementById('nextTurnBtn').addEventListener('click', nextTurn);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('instructionsBtn').addEventListener('click', showInstructions);
document.getElementById('closeInstructionsBtn').addEventListener('click', closeInstructions);
