import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ThemeProvider } from "@material-ui/styles";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createTheme } from "@material-ui/core"; import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import DataGridTodoList from './components/datagrid-todo';
import TodoGrid from './components/grid-todo';
import DeleteAllPopup from './popups/delete-all-popup';
import DeleteMultipleModal from './popups/delete-multiple-popup';
import DeletePopup from './popups/delete-popup';
import EditPopup from './popups/edit-popup';
import InfoPopup from './popups/infoPopup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ""
      }
    })
  }
});
const muiTheme = createTheme();
root.render(
  <>
    <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
    <ToastContainer />
  </React.StrictMode>
    {/* <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <DataGridTodoList />
            </PersistGate>
            <InfoPopup />
            <DeletePopup />
            <EditPopup />
            <DeleteMultipleModal />
            <DeleteAllPopup />
          </Provider>
        </ThemeProvider>
        <ToastContainer/>
      </BrowserRouter>
    </React.StrictMode> */}

  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
