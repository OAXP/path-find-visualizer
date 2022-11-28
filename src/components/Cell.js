import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {useAlgo} from "../hooks/AlgoProvider";
import {Icon} from "@chakra-ui/icons";
import { BsFillPinMapFill } from "react-icons/bs";
import { GiBrickWall, GiFinishLine } from "react-icons/gi";

export default function Cell({i, j}) {

    const { grid, setGrid, run, mode, start, end } = useAlgo();

    return (
        <Flex
            bg={useColorModeValue('gray.200', 'gray.900')}
            justifyContent={'center'}
            align={'center'}
            onClick={() => {
                if (!run) {
                    switch (mode) {
                        case 'putWall':
                            if (!grid[i][j].isStart && !grid[i][j].isEnd) {
                                if(grid[i][j].isWall) {
                                    setGrid(old => {
                                        old[i][j].isWall = false;
                                        return [...old];
                                    });
                                } else {
                                    setGrid(old => {
                                        old[i][j].isWall = true;
                                        return [...old];
                                    });
                                }
                            }
                            break;
                        case 'putStart':
                            if(!grid[i][j].isWall && !grid[i][j].isStart && !grid[i][j].isEnd) {
                                setGrid(old => {
                                    old[start.current.y][start.current.x].isStart = false;
                                    old[i][j].isStart = true;
                                    start.current = {x: j, y: i};
                                    return [...old];
                                });
                            }
                            break;
                        case 'putEnd':
                            if(!grid[i][j].isWall && !grid[i][j].isStart && !grid[i][j].isEnd) {
                                setGrid(old => {
                                    old[end.current.y][end.current.x].isEnd = false;
                                    old[i][j].isEnd = true;
                                    end.current = {x: j, y: i};
                                    return [...old];
                                });
                            }
                            break;
                        default:
                            // Should not be here
                            break;
                    }
                }
            }}
        >
            {
                grid[i][j].isStart ?
                <Icon as={BsFillPinMapFill}/> :
                grid[i][j].isEnd ?
                    <Icon as={GiFinishLine}/> :
                grid[i][j].isWall ?
                    <Icon as={GiBrickWall}/> :
                grid[i][j].visited ?
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    <Box w={'full'} h={'full'} bg={useColorModeValue('black', 'gray.200')}/> :
                    null
            }
        </Flex>
    );
}
