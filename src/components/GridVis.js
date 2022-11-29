import {useAlgo} from "../hooks/AlgoProvider";
import {Center, Grid} from "@chakra-ui/react";
import Cell from "./Cell";

export default function GridVis() {

    const { grid, setGrid, run, mode, start, end } = useAlgo();

    return (
        <Center>
            <Grid
                templateColumns={`repeat(${grid[0].length}, 1fr)`}
                templateRows={`repeat(${grid.length}, 1fr)`}
                gap={'1px'}
                bg={'gray.500'}
                w={'max-content'}
                mt={'70px'}
            >
                {
                    grid.map((value) => {
                        return value.map((e) => {
                            return (
                                <Cell i={e.y} j={e.x} key={`${e.x}-${e.y}`}
                                      grid={grid} setGrid={setGrid}
                                      run={run} mode={mode}
                                      start={start} end={end}
                                />
                            );
                        })
                    })
                }
            </Grid>
        </Center>
    );
}
