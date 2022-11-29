import {
    Box, Flex,
    IconButton, Select,
    useColorMode, useColorModeValue
} from "@chakra-ui/react";
import { BsFillPlayFill, BsFillPinMapFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { GiBrickWall, GiFinishLine } from "react-icons/gi";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { useAlgo } from "../hooks/AlgoProvider";
import BFS from "../algos/BFS";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { algo, setAlgo, mode, setMode, setRst, run, setRun, start, grid, setGrid } = useAlgo();

    function getShortestPath(visitedOrder = []) {
        const shortestPath = [];
        let current = visitedOrder[visitedOrder.length - 1];
        while (current !== null) {
            shortestPath.unshift(current);
            current = current.previous;
        }
        shortestPath.push('stop');
        return shortestPath;
    }

    function visualizeBFS(visitedOrder, shortestPath) {
        visitedOrder.forEach((cell, index) => {
            setTimeout(() => {
                if (!cell.isStart && !cell.isEnd) {
                    setGrid(old => {
                        cell.visited = true;
                        old[cell.y][cell.x] = cell;
                        return [...old];
                    });
                }
            }, 5 * index);
        });
        setTimeout(() => {
            visualizePath(shortestPath);
        }, 5 * visitedOrder.length);
    }

    function visualizePath(shortestPath) {
        setRun(false);
    }

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} p={4}>
            <Flex
                justifyContent={'space-evenly'}
            >
                <IconButton
                    aria-label={'Place Wall'}
                    colorScheme='blue'
                    icon={<GiBrickWall/>}
                    isActive={mode === 'putWall'}
                    isDisabled={run}
                    onClick={() => {
                        if (mode === 'putWall') setMode(null);
                        else setMode('putWall');
                    }}
                />
                <IconButton
                    aria-label={'Place Starting Point'}
                    colorScheme='blue'
                    icon={<BsFillPinMapFill/>}
                    isActive={mode === 'putStart'}
                    isDisabled={run}
                    onClick={() => {
                        if (mode === 'putStart') setMode(null);
                        else setMode('putStart');
                    }}
                />
                <IconButton
                    aria-label={'Place Ending Point'}
                    colorScheme='blue'
                    icon={<GiFinishLine/>}
                    isActive={mode === 'putEnd'}
                    isDisabled={run}
                    onClick={() => {
                        if (mode === 'putEnd') setMode(null);
                        else setMode('putEnd');
                    }}
                />
                <IconButton
                    aria-label={'Reset'}
                    colorScheme='blue'
                    icon={<BiReset/>}
                    isDisabled={run}
                    onClick={() => {
                        setRst(old => !old);
                    }}
                />
                <IconButton
                    aria-label={'Start Algorithm'}
                    colorScheme='blue'
                    icon={<BsFillPlayFill/>}
                    isDisabled={run}
                    isActive={run}
                    onClick={() => {
                        setRun(true);
                        const visitedOrder = BFS({grid, start});
                        const shortestPath = getShortestPath(visitedOrder);
                        // TODO function to visualize the path
                        visualizeBFS(visitedOrder, shortestPath);
                    }}
                />
                <Box>
                    <Select
                        placeholder={'Select Algo'}
                        value={algo}
                        onChange={e => {
                            setAlgo(e.target.value);
                        }}
                    >
                        <option value='BFS'>BFS</option>
                        <option value='DFS'>DFS</option>
                    </Select>
                </Box>
                <IconButton
                    aria-label={'Change Theme'}
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                />
            </Flex>
        </Box>
    );
};

export default Header;