// Variables para almacenar los nombres de los jugadores
var player1Name = "";
var player2Name = "";

// Variable para controlar el turno actual (true para player1, false para player2)
let isPlayer1Turn = true;

// Array para almacenar el estado del tablero (inicialmente vacío)
let board = Array(20).fill(null);

// Función para inicializar el juego
function startGame() {
    // Obtener los nombres de los jugadores desde los inputs
    player1Name = document.getElementById("player1").value || "Jugador 1";
    player2Name = document.getElementById("player2").value || "Jugador 2";
    
    // Reiniciar el tablero y el turno
    board = Array(20).fill(null);
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
        [0, 1, 2], [1, 2, 3], [2, 3, 4],
        [5, 6, 7], [6, 7, 8], [7, 8, 9],
        [10, 11, 12], [11, 12, 13], [12, 13, 14],
        [15, 16, 17], [16, 17, 18], [17, 18, 19],

        // Columnas
        [0, 5, 10], [5, 10, 15],
        [1, 6, 11], [6, 11, 16],
        [2, 7, 12], [7, 12, 17],
        [3, 8, 13], [8, 13, 18],
        [4, 9, 14], [9, 14, 19],

        // Diagonales
        [0, 6, 12], [1, 7, 13], [2, 8, 14], [5, 11, 17], [6, 12, 18], [7, 13, 19],
        [2, 6, 10], [3, 7, 11], [4, 8, 12], [7, 11, 15], [8, 12, 16], [9, 13, 17]
    ];
    
    // Comprobar si alguna combinación ganadora está completa
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;  // Solo necesitamos tres índices
        
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Pintar las casillas ganadoras del color correspondiente
            const winningColor = board[a] === "X" ? "blue" : "red";
            document.getElementById(a + 1).style.backgroundColor = winningColor;
            document.getElementById(b + 1).style.backgroundColor = winningColor;
            document.getElementById(c + 1).style.backgroundColor = winningColor;
            // Dar un breve retraso antes de mostrar la alerta para que se vea el cambio de color
            setTimeout(() => {
                // Anunciar al ganador
                alert(`¡${board[a] === "X" ? player1Name : player2Name} has ganado !`);
                startGame(); // Reiniciar el juego
            }, 200); // Retraso de 500ms para permitir la visualización del color
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

