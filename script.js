// Variables para almacenar los nombres de los jugadores
let player1Name = "";
let player2Name = "";

// Variable para controlar el turno actual (true para player1, false para player2)
let isPlayer1Turn = true;

// Array para almacenar el estado del tablero (inicialmente vacío)
let board = Array(25).fill(null);

// Función para inicializar el juego
function startGame() {
    // Obtener los nombres de los jugadores desde los inputs
    player1Name = document.getElementById("player1").value || "Jugador 1";
    player2Name = document.getElementById("player2").value || "Jugador 2";
    
    // Reiniciar el tablero y el turno
    board = Array(25).fill(null);
    isPlayer1Turn = true;
    
    // Limpiar el tablero visualmente
    document.querySelectorAll('.caja').forEach(caja => {
        caja.style.backgroundColor = "white";
        caja.textContent = "";
    });
}

// Función para manejar los clics en las casillas del tablero
function handleBoxClick(event) {
    const boxId = parseInt(event.target.id) - 1; // Obtener el ID de la casilla clicada
    
    // Comprobar si la casilla ya está ocupada
    if (board[boxId] !== null) return;
    
    // Marcar la casilla con el color y símbolo del jugador correspondiente
    board[boxId] = isPlayer1Turn ? "X" : "O";
    event.target.textContent = isPlayer1Turn ? "X" : "O";
    event.target.classList.add('letra');
    event.target.style.backgroundColor = isPlayer1Turn ? "blue" : "red";
    
    // Cambiar el turno
    isPlayer1Turn = !isPlayer1Turn;
    
    // Comprobar si hay un ganador
    checkWinner();
}

// Función para comprobar si hay un ganador
function checkWinner() {
    // Definir las combinaciones ganadoras
    const winningCombinations = [
        // Filas
        [0, 1, 2, 3], [1, 2, 3, 4],
        [5, 6, 7, 8], [6, 7, 8, 9],
        [10, 11, 12, 13], [11, 12, 13, 14],
        [15, 16, 17, 18], [16, 17, 18, 19],
        [20, 21, 22, 23], [21, 22, 23, 24], 

        // Columnas
        [0, 5, 10, 15], [5, 10, 15, 20],
        [1, 6, 11, 16], [6, 11, 16, 21],
        [2, 7, 12, 17], [7, 12, 17, 22],
        [3, 8, 13, 18], [8, 13, 18, 23],
        [4, 9, 14, 19], [9, 14, 19, 24],

        // Diagonales
        [0, 6, 12, 18], [1, 7, 13, 19], [6, 12, 18, 24], [5, 11, 17, 23],
        [3, 7, 11, 15], [4, 8, 12, 16], [8, 12, 16, 20], [9, 13, 17, 21]
    ];
    
    // Comprobar si alguna combinación ganadora está completa
    for (let combination of winningCombinations) {
        const [a, b, c, d] = combination;  // Solo necesitamos tres índices
        
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
            // Pintar las casillas ganadoras del color correspondiente
            const winningColor = board[a] === "X" ? "blue" : "red";
            document.getElementById(a + 1).style.backgroundColor = winningColor;
            document.getElementById(b + 1).style.backgroundColor = winningColor;
            document.getElementById(c + 1).style.backgroundColor = winningColor;
            document.getElementById(d + 1).style.backgroundColor = winningColor;
            // Dar un breve retraso antes de mostrar la alerta para que se vea el cambio de color
            setTimeout(() => {
                // Anunciar al ganador
                alert(`¡${board[a] === "X" ? player1Name : player2Name} has ganado !`);
                startGame(); // Reiniciar el juego
            }, 200); // Retraso de 200ms para permitir la visualización del color
            return; // Salir de la función después de encontrar un ganador
        }
    }
    
    // Comprobar si el tablero está lleno (empate)
    if (!board.includes(null)) {
        alert("¡Empate!");
        startGame(); // Reiniciar el juego
    }
}

// Añadir eventos a las casillas del tablero
document.querySelectorAll('.caja').forEach(caja => {
    caja.addEventListener('click', handleBoxClick);
});

// Añadir evento al botón de iniciar juego
document.getElementById("startGame").addEventListener('click', startGame);