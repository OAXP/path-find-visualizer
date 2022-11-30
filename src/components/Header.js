import {
    Box, Flex,
    IconButton, Select,
    useColorMode, useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { BsFillPlayFill, BsFillPinMapFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { GiBrickWall, GiFinishLine } from "react-icons/gi";
import { FaRandom } from "react-icons/fa";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { useAlgo } from "../hooks/AlgoProvider";
import BFS from "../algos/BFS";
import DFS from "../algos/DFS";
import makeMaze from "../algos/makeMaze";

const Header = () => {
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();
    const { algo, setAlgo, mode, setMode, setRst, run, setRun, start, end, grid, setGrid } = useAlgo();

    function getShortestPath(visitedOrder = []) {
        const shortestPath = [];
        let current = visitedOrder[visitedOrder.length - 1];
        while (current !== null) {
            shortestPath.unshift(current);
            current = current.previous;
        }
        return shortestPath;
    }

    function visualizeAlgo(visitedOrder, shortestPath) {
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
        shortestPath.forEach((cell, index) => {
            setTimeout(() => {
                if (!cell.isStart && !cell.isEnd) {
                    setGrid(old => {
                        cell.path = true;
                        old[cell.y][cell.x] = cell;
                        return [...old];
                    });
                }
            }, 10 * index);
        });
        setTimeout(() => { setRun(false); }, 10 * shortestPath.length);
    }

    function removePath() {
        setGrid(old => {
            old.forEach(sub => {
                sub.forEach(cell => {
                    old[cell.y][cell.x].visited = false;
                    old[cell.y][cell.x].path = false;
                });
            });
            return [...old];
        });
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
                        removePath();
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
                        removePath();
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
                        removePath();
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
                    aria-label={'Random'}
                    colorScheme='blue'
                    icon={<FaRandom/>}
                    isDisabled={run}
                    onClick={() => {
                        setGrid(makeMaze(25, 25));
                        start.current = null;
                        end.current = null;
                    }}
                />
                <IconButton
                    aria-label={'Start Algorithm'}
                    colorScheme='blue'
                    icon={<BsFillPlayFill/>}
                    isDisabled={run}
                    isActive={run}
                    onClick={() => {
                        if (start.current === null || end.current === null) {
                            toast({
                                title: 'Error',
                                description: 'Please choose a start and an end.',
                                status: 'error',
                                duration: 2000,
                                isClosable: true,
                                position: 'bottom-left',
                            });
                            return;
                        }
                        removePath();
                        setMode(null);
                        setRun(true);
                        let visitedOrder;
                        switch (algo) {
                            case 'BFS':
                                visitedOrder = BFS({grid, start});
                                break;
                            case 'DFS':
                                visitedOrder = DFS({grid, start});
                                break;
                            default:
                                visitedOrder = BFS({grid, start}); // Default is BFS
                                break;
                        }
                        const shortestPath = getShortestPath(visitedOrder);
                        visualizeAlgo(visitedOrder, shortestPath);
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