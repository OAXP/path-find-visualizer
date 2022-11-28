import {
    Box, Flex, IconButton,
    useColorModeValue
} from "@chakra-ui/react";

import { BsFillPlayFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

const Header = () => {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} p={4}>
            <Flex
                justifyContent={'space-evenly'}
            >
                <IconButton
                    aria-label={'Place Wall'}
                    colorScheme='blue'
                    icon={<BiReset/>}
                />
                <IconButton
                    aria-label={'Place Starting Point'}
                    colorScheme='blue'
                    icon={<BiReset/>}
                />
                <IconButton
                    aria-label={'Place Ending Point'}
                    colorScheme='blue'
                    icon={<BiReset/>}
                />
                <IconButton
                    aria-label={'Reset'}
                    colorScheme='blue'
                    icon={<BiReset/>}
                />
                <IconButton
                    aria-label={'Start Algorithm'}
                    colorScheme='blue'
                    icon={<BsFillPlayFill/>}
                />
            </Flex>
        </Box>
    );
};

export default Header;