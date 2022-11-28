import './styles/App.css';
import {Box} from "@chakra-ui/react";
import Header from "./components/Header";
import GridVis from "./components/GridVis";


function App() {

    return (
        <Box>
            <Header/>
            <GridVis/>
        </Box>
    );
}

export default App;
