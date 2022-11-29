import {useAlgo} from "../hooks/AlgoProvider";
import {Grid} from "@chakra-ui/react";
import Cell from "./Cell";

export default function GridVis() {

    const { grid, setGrid, run, mode, start, end } = useAlgo();

    return (
        <Grid
            templateColumns={'repeat(50, 1fr)'}
            templateRows={'repeat(25, 1fr)'}
            gap={'1px'}
            height={'calc(100vh - 10vh)'}
            bg={'gray.500'}
        >
            {
                grid.map((value, y) => {
                    return value.map((e, x) => {
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
    );
}
