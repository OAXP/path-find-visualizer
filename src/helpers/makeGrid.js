export function makeGrid(w, h){
    const grid = [];
    for (let i = 0; i < h; i++) {
        const subGrid = [];
        for (let j = 0; j < w; j++) {
            subGrid.push(
                {
                    x: j,
                    y: i,
                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    visited: false,
                    previous: null
                }
            );
        }
        grid.push(subGrid);
    }

    grid[0][0].isStart = true;
    grid[Math.floor(h/2)][Math.floor(w/2)].isEnd = true;

    return grid;
}