import {createContext, useContext, useEffect, useRef, useState} from "react";
import {makeGrid} from "../helpers/makeGrid";

const context = createContext();

export const useAlgo = () => {
    return useContext(context);
};

export const AlgoProvider = ({children}) => {

    const [algo, setAlgo] = useState(''); // BFS, DFS
    const [run, setRun] = useState(false);
    const [grid, setGrid] = useState(makeGrid(25, 25));
    const [mode, setMode] = useState(null);
    const [rst, setRst] = useState(false);
    const start = useRef({x:0, y:0});
    const end = useRef({x:12, y:12});

    function reset() {
        setGrid(makeGrid(25, 25));
        start.current = {x:0, y:0};
        end.current = {x:12, y:12};
    }

    useEffect(() => {
        reset();
    }, [rst]);

    return (
        <div>
            <context.Provider value={
                {
                    algo, setAlgo,
                    run, setRun,
                    grid, setGrid,
                    mode, setMode,
                    rst, setRst,
                    start, end
                }
            }>
                {children}
            </context.Provider>
        </div>
    );
}
