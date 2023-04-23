import React from 'react'
import { io } from "socket.io-client";
import AppBarContainer from './components/AppBar';
import HomeContainer from './components/HomeContainer';

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
const socket = io(socketUrl);

export const SocketConnection = React.createContext(socket);

function App() {
  return (
    <>
      <SocketConnection.Provider value={socket}>
          <AppBarContainer/>
          {/*isAdminError || isRefreshed ? <AdminClosed /> : <HomeContainer />*/}
          <HomeContainer />
      </SocketConnection.Provider>
    </>
  );
}

export default React.memo(App);
