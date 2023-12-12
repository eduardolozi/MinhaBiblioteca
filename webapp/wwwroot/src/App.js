import './App.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ListaDeLivros from './Listagem';
import SearchAppBar from './Header';
import Box from '@mui/material/Box';

function App() {
  return (
    <>
      <SearchAppBar />
      <Box
        marginTop="2%"
        display="flex"
        justifyContent="center"
        minHeight="100vh"
      >
        <ListaDeLivros />
      </Box>
    </>
  );
}

export default App;
