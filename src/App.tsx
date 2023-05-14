import React from 'react'
import { io } from "socket.io-client";
import AppBarContainer from './components/AppBar';
import HomeContainer from './components/HomeContainer';
import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';
import AdminClosed from './components/AdminClosed';
import textFinder from './components/assets/static-texts';

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
const socket = io(socketUrl);

export const SocketConnection = React.createContext(socket);


function App() {
  const { isAdminError } = useAppSelector((state: RootState) => state.user);

  return (
    <>
      <SocketConnection.Provider value={socket}>
          <AppBarContainer/>
            {isAdminError ? <AdminClosed text={textFinder('adminClosedForAllUsers')} /> : <HomeContainer />}
      </SocketConnection.Provider>
    </>
  );
}

export default React.memo(App);
