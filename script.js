document.addEventListener("DOMContentLoaded", function () {
    var board = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,2,1,1],
        [1,1,1,1,1],
        [1,1,1,1,1]
    ];    
    var linear = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    var cross = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    // var takingMove = 
    var scoreWhite = 0;
    var scoreBlack = 0;
    var isWhiteTurn = true;
    var draggedPiece = null;
    var originalCell = null;
    var validMoves = [];
    var draggedPath = [];

    var boardContainer = document.getElementById('board-container');
    var scoreWhiteElement = document.getElementById('score-white');
    var scoreBlackElement = document.getElementById('score-black');
    var resetButton = document.getElementById('reset-button');

    // Function to display the board
    function displayBoard() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var cell = document.createElement('div');
                cell.id = 'cell-' + i + '-' + j;
                cell.classList.add('cell');
                if (board[i][j]!==2){
                    var piece = document.createElement('div');
                    piece.classList.add('piece');
                    if (board[i][j] === 1) piece.classList.add('white');
                    piece.id = 'piece-' + i + '-' + j;
                    cell.appendChild(piece);
                
                    piece.addEventListener('click', function () {
                        if (isWhiteTurn && this.classList.contains('white') || (!isWhiteTurn && !this.classList.contains('white'))) {
                            if (this.classList.contains('highlight')){
                                this.classList.remove('highlight');
                                this.removeAttribute('draggable');
                            } else {
                                this.classList.add('highlight');
                                this.setAttribute('draggable', 'true');
                            }
                        }
                    });

                    piece.addEventListener('dragstart', function (event) {
                        draggedPiece = event.target;
                        originalCell = event.target.parentNode;
                        draggedPath = [];
                    });

                    piece.addEventListener('dragend', function () {
                        draggedPiece = null;
                        originalCell = null;
                        // draggedPath = [];
                    });
                    
                }
                
                cell.addEventListener('dragover', function (event) {
                    event.preventDefault();
                    if (draggedPiece) {
                        var cellId = event.target.id;
                        var [_, row, col] = cellId.split('-');
                        var newPosition = { row: parseInt(row), col: parseInt(col) };
                        if (!isPositionInPath(newPosition)) {
                            draggedPath.push(newPosition);
                        }
                    }
                });
                
                cell.addEventListener('drop', function (event) {
                    event.preventDefault();
                    if (draggedPiece && isValid(draggedPath)) {
                        draggedPiece.id = event.target.id.replace('cell','piece');
                        event.target.appendChild(draggedPiece);
                    }
                    draggedPiece = null;
                    draggedPath = [];
                });

                boardContainer.appendChild(cell);
            }
        }
    }

    // Function to check if a position is already in the path
    function isPositionInPath(position) {
        return draggedPath.some(function (p) {
            return p.row === position.row && p.col === position.col;
        });
    }

    function isValid(draggedPath){
        if (draggedPath.length===1){
            alert("Please move peice to a different cell.")
            return false;
        } 
        var nbr = draggedPath.pop();
        if (document.getElementById(nbr).hasChildNodes()) {
            alert("Please move piece to an empty cell")
        } else {
            
        }
        return true;
    }

    // Function to get neighbors
    function getNeighbours(cell) {
        var [_,i,j] = cell.id.split('-').map(Number);
        var neighbours = [];

        if ((i + j) % 2 === 0) {
            cross.forEach(function (dir) {
                var x = dir[0] + i;
                var y = dir[1] + j;
                if (x >= 0 && x < 5 && y >= 0 && y < 5) {
                    neighbours.push('cell-' + x + '-' + y);
                }
            });
        } else {
            linear.forEach(function (dir) {
                var x = dir[0] + i;
                var y = dir[1] + j;
                if (x >= 0 && x < 5 && y >= 0 && y < 5) {
                    neighbours.push('cell-' + x + '-' + y);
                }
            });
        }
        return neighbours;
    }

    // Function to update scores
    function updateScores() {
        scoreWhiteElement.textContent = 'White: ' + scoreWhite;
        scoreBlackElement.textContent = 'Black: ' + scoreBlack;
    }

    // Function to reset the game
    function resetGame() {
        // Add logic to reset the game
    }

    // Event listener for reset button
    resetButton.addEventListener('click', function () {
        resetGame();
    });
    displayBoard();
});