export default function DFS({grid, start}) {

    // const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]];

    const stack = [grid[start.current.y][start.current.x]];
    const visitedOrder = [];
    const visited = {};
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            visited[`${j}-${i}`] = false; // fills with false
        }
    }


    while (stack.length) {
        const currentCell = stack.pop();
        if (currentCell.isEnd) {
            visitedOrder.push(currentCell);
            return visitedOrder; // Use in other function
        }

        if (
            !currentCell.isWall &&
            (currentCell.isStart || !visited[`${currentCell.x}-${currentCell.y}`])
        ) {
            visited[`${currentCell.x}-${currentCell.y}`] = true;
            visitedOrder.push(currentCell);
            const {x, y} = currentCell;
            let nextCell;

            if (y > 0) {
                nextCell = grid[y - 1][x];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    stack.push(nextCell);
                }
            }

            if (y < grid.length - 1) {
                nextCell = grid[y + 1][x];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    stack.push(nextCell);
                }
            }

            if (x > 0) {
                nextCell = grid[y][x - 1];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    stack.push(nextCell);
                }
            }

            if (x < grid[0].length - 1) {
                nextCell = grid[y][x + 1];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    stack.push(nextCell);
                }
            }
        }

    }

    return visitedOrder;
}