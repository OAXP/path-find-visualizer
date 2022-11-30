export default function makeMaze(width, height) {
    const grid = [];

    for (let i = 0; i < height; i++) {
        const subGrid = [];
        for (let j = 0; j < width; j++) {
            subGrid.push(
                {
                    x: j,
                    y: i,
                    isStart: false,
                    isEnd: false,
                    isWall: true,
                    visited: false,
                    previous: null,
                    path: false
                }
            );
        }
        grid.push(subGrid);
    }

    // generate random Row and Column
    let r = randomInt(height);
    while (r % 2 === 0) {
        r = randomInt(height);
    }

    let c = randomInt(width);
    while (c % 2 === 0) {
        c = randomInt(width);
    }

    // Start the randomized DFS from gird[r][c];
    grid[r][c].isWall = false;

    randomDFS(r, c, grid);

    return grid;
}

const randomInt = (x, min = 0) => Math.floor(Math.random() * x) + min;

const randomDirections = () => {
    const rand = [];
    for (let i = 0; i < 4; i++) {
        rand.push(randomInt(4, 1));
    }

    return rand;
}

function randomDFS(r, c, arr) {
    const randD = randomDirections();

    randD.forEach(direction => {
        switch (direction) {
            case 1:
                if (r - 2 <= 0)
                    break;
                if (arr[r - 2][c].isWall) {
                    arr[r - 2][c].isWall = false;
                    arr[r - 1][c].isWall = false;
                    randomDFS(r - 2, c, arr);
                }
                break;
            case 2:
                if (c + 2 >= arr[0].length - 1)
                    break;
                if (arr[r][c + 2].isWall) {
                    arr[r][c + 2].isWall = false;
                    arr[r][c + 1].isWall = false;
                    randomDFS(r, c + 2, arr);
                }
                break;
            case 3:
                if (r + 2 >= arr.length - 1)
                    break;
                if (arr[r + 2][c].isWall) {
                    arr[r + 2][c].isWall = false;
                    arr[r + 1][c].isWall = false;
                    randomDFS(r + 2, c, arr);
                }
                break;
            case 4:
                if (c - 2 <= 0)
                    break;
                if (arr[r][c - 2].isWall) {
                    arr[r][c - 2].isWall = false;
                    arr[r][c - 1].isWall = false;
                    randomDFS(r, c - 2, arr);
                }
                break;
            default:
                // should not be here
                break;
        }
    });
}