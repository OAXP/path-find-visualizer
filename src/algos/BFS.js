import { useAlgo } from "../hooks/AlgoProvider";

export default function BFS() {
    const { grid, start } = useAlgo();

    // const directions = [[-1, 0], [0, -1], [0, 1], [1, 0]];

    const q = [grid[start.current.y][start.current.x]];
    const visitedOrder = [];
    const visited = {};
    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 50; j++) {
            visited[`${j}-${i}`] = false; // fills with false
        }
    }


    while (q.length) {
        const currentCell = q.shift();
        if (currentCell.isEnd) return visitedOrder; // Use in other function

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
                    q.push(nextCell);
                }
            }

            if (y < grid.length - 1) {
                nextCell = grid[y + 1][x];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    q.push(nextCell);
                }
            }

            if (x > 0) {
                nextCell = grid[y][x - 1];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    q.push(nextCell);
                }
            }

            if (x < grid[0].length) {
                nextCell = grid[y][x + 1];
                if (!visited[`${nextCell.x}-${nextCell.y}`]) {
                    nextCell.previous = currentCell;
                    q.push(nextCell);
                }
            }
        }

    }
}