import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from './utils/Provider.jsx'
import CssBaseline from '@mui/material/CssBaseline';  // Ensures consistent dark mode stylesi
import App from './App.jsx'
import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',  // Set mode to dark for MUI
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
