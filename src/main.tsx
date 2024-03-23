import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactNotifications } from 'react-notifications-component'
import AppBarContainer from "./components/AppBar";
import 'react-notifications-component/dist/theme.css'
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppBarContainer />
            <App />
          <ReactNotifications />
        </PersistGate>
      </Provider>
);
