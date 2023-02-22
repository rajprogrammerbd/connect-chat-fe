import React from 'react'
import { io } from "socket.io-client";
import { message } from 'antd';
import AppBarContainer from './components/AppBar';
import HomeContainer from './components/HomeContainer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { RootState } from './store/store';
import { set_socket_id } from './store/socket';

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
const socket = io(socketUrl);

export const SocketConnection = React.createContext(socket);

function App() {
  const dispatch = useAppDispatch();
  const socketId = useAppSelector((state: RootState) => state.socketSlice.socketId);
  
  socket.on('connect', () => {
    if (socketId === '' && socket.id !== '') {
      dispatch(set_socket_id({ id: socket.id }));
    } else {
      if (socket.id !== socketId) {
        socket.emit('change_socket_oldId', socketId);
        dispatch(set_socket_id({ id: socket.id }));
      }
    }
  });

  socket.on('admin_closed', (obj: { message: string }) => {
    message.info(obj.message);
  })

  return (
    <>
      <SocketConnection.Provider value={socket}>
          <AppBarContainer/>
          <HomeContainer />
      </SocketConnection.Provider>
    </>
  );
}

export default React.memo(App);
