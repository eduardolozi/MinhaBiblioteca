import './App.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Cabecalho from './Cabecalho';
import ListaDeLivros from './Listagem';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const temaEscuro = createTheme({
  palette: {
    mode: "dark"
  },
});

function App() {
  return (
    <ThemeProvider theme={temaEscuro}>
      <Cabecalho/>
      <ListaDeLivros/>
    </ThemeProvider>
  );
}

export default App;
