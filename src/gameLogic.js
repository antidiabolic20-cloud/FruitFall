// Core Game Logic & Gravity Engine for Gravity Fruit Match Game

export const FRUIT_TYPES = {
  1: { id: 1, name: 'Apple', emoji: '🍎', color: '#e53935', bg: '#ffebee' },
  2: { id: 2, name: 'Grape', emoji: '🍇', color: '#8e24aa', bg: '#f3e5f5' },
  3: { id: 3, name: 'Orange', emoji: '🍊', color: '#fb8c00', bg: '#fff3e0' },
  4: { id: 4, name: 'Strawberry', emoji: '🍓', color: '#d81b60', bg: '#fce4ec' },
  5: { id: 5, name: 'Banana', emoji: '🍌', color: '#fdd835', bg: '#fffde7' },
  6: { id: 6, name: 'Blueberry', emoji: '🫐', color: '#1e88e5', bg: '#e3f2fd' },
  7: { id: 7, name: 'Cherry', emoji: '🍒', color: '#c2185b', bg: '#f8bbd0' },
};

/**
 * Generate a 2D matrix (rows x cols) filled with fruit IDs.
 * Guarantees every fruit ID has an EVEN count so all fruits are clearable in pairs!
 */
export function createInitialBoard(rows, cols, allowedTypes) {
  const totalCells = rows * cols;
  const isOddTotal = totalCells % 2 !== 0;
  
  const pairCount = Math.floor(totalCells / 2);
  const fruitPool = [];

  for (let i = 0; i < pairCount; i++) {
    const randomType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    fruitPool.push(randomType, randomType); // Always add in pairs!
  }

  if (isOddTotal) {
    fruitPool.push(0); // empty slot if total cells is odd
  }

  // Shuffle the pool using Fisher-Yates
  for (let i = fruitPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruitPool[i], fruitPool[j]] = [fruitPool[j], fruitPool[i]];
  }

  // Convert 1D array into 2D rows x cols matrix
  const board = [];
  let index = 0;
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(fruitPool[index++]);
    }
    board.push(row);
  }

  return board;
}

export function checkMatch(board, r1, c1, r2, c2) {
  if (r1 === r2 && c1 === c2) return false;
  
  const val1 = board[r1]?.[c1];
  const val2 = board[r2]?.[c2];

  if (!val1 || !val2 || val1 === 0 || val2 === 0) return false;

  return val1 === val2;
}

export function applyMatchAndGravity(board, r1, c1, r2, c2) {
  const rows = board.length;
  const cols = board[0].length;
  const newBoard = board.map(row => [...row]);

  // Set matched fruits to 0
  newBoard[r1][c1] = 0;
  newBoard[r2][c2] = 0;

  const columnMoves = [];

  // Apply Gravity Column by Column
  for (let c = 0; c < cols; c++) {
    const nonZeroFruits = [];
    for (let r = 0; r < rows; r++) {
      const val = newBoard[r][c];
      if (val !== 0) {
        nonZeroFruits.push({ val, oldRow: r });
      }
    }

    const emptyCount = rows - nonZeroFruits.length;

    for (let r = 0; r < rows; r++) {
      if (r < emptyCount) {
        newBoard[r][c] = 0;
      } else {
        const item = nonZeroFruits[r - emptyCount];
        newBoard[r][c] = item.val;
        columnMoves.push({
          val: item.val,
          col: c,
          fromRow: item.oldRow,
          toRow: r,
          distance: r - item.oldRow
        });
      }
    }
  }

  return {
    newBoard,
    columnMoves
  };
}

/**
 * Power-up: Blender Cascade - Clears an entire column and drops remaining fruits down
 */
export function applyBlenderColumnCascade(board, targetCol) {
  const rows = board.length;
  const cols = board[0].length;
  const newBoard = board.map(row => [...row]);

  // Clear entire target column
  for (let r = 0; r < rows; r++) {
    newBoard[r][targetCol] = 0;
  }

  // Also if any fruit in that column had an odd matching partner elsewhere on the board, 
  // ensure overall fruit pairs stay even by clearing one matching fruit elsewhere if needed
  // (or simply let gravity drop the rest of the column)

  const columnMoves = [];
  for (let c = 0; c < cols; c++) {
    const nonZeroFruits = [];
    for (let r = 0; r < rows; r++) {
      const val = newBoard[r][c];
      if (val !== 0) {
        nonZeroFruits.push({ val, oldRow: r });
      }
    }

    const emptyCount = rows - nonZeroFruits.length;
    for (let r = 0; r < rows; r++) {
      if (r < emptyCount) {
        newBoard[r][c] = 0;
      } else {
        const item = nonZeroFruits[r - emptyCount];
        newBoard[r][c] = item.val;
        columnMoves.push({
          val: item.val,
          col: c,
          fromRow: item.oldRow,
          toRow: r,
          distance: r - item.oldRow
        });
      }
    }
  }

  return { newBoard, columnMoves };
}

export function findPossibleMatch(board) {
  const rows = board.length;
  const cols = board[0].length;
  const fruitPositionsMap = {};

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = board[r][c];
      if (val !== 0) {
        if (!fruitPositionsMap[val]) {
          fruitPositionsMap[val] = [];
        }
        fruitPositionsMap[val].push([r, c]);
      }
    }
  }

  for (const val in fruitPositionsMap) {
    const posList = fruitPositionsMap[val];
    if (posList.length >= 2) {
      return [posList[0], posList[1]];
    }
  }

  return null;
}

export function isBoardCleared(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] !== 0) return false;
    }
  }
  return true;
}

export function countRemainingFruits(board) {
  let count = 0;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] !== 0) count++;
    }
  }
  return count;
}

export function shuffleBoard(board) {
  const rows = board.length;
  const cols = board[0].length;
  const remainingVals = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] !== 0) {
        remainingVals.push(board[r][c]);
      }
    }
  }

  for (let i = remainingVals.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingVals[i], remainingVals[j]] = [remainingVals[j], remainingVals[i]];
  }

  const newBoard = board.map(row => row.map(() => 0));
  let idx = 0;

  for (let c = 0; c < cols; c++) {
    let colItemsCount = 0;
    for (let r = 0; r < rows; r++) {
      if (board[r][c] !== 0) colItemsCount++;
    }

    const startRow = rows - colItemsCount;
    for (let r = startRow; r < rows; r++) {
      if (idx < remainingVals.length) {
        newBoard[r][c] = remainingVals[idx++];
      }
    }
  }

  return newBoard;
}
