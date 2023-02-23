import React from 'react'
import { io } from "socket.io-client";
import AppBarContainer from './components/AppBar';
import HomeContainer from './components/HomeContainer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { RootState } from './store/store';
import { set_admin_error, set_is_refresh, set_socket_id } from './store/socket';
import AdminClosed from './components/AdminClosed';

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
const socket = io(socketUrl);

export const SocketConnection = React.createContext(socket);
// set_admin_error
function App() {
  const dispatch = useAppDispatch();
  const { isConnected } = useAppSelector((state: RootState) => state.websocketReducer);
  const { socketId, isAdminError, isRefreshed } = useAppSelector((state: RootState) => state.socketSlice);

  const unloadEvent = (e: any) => {
    if (isConnected) {
      dispatch(set_is_refresh(true));
    }

    e.preventDefault();
    e.returnValue = '';
  }

  React.useEffect(() => {
    window.addEventListener('beforeunload', unloadEvent);

    return () => {
      window.removeEventListener('beforeunload', unloadEvent);
    }
  });
  
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
    // Show the messages to everyone that the admin has closed the chat.
    dispatch(set_admin_error({ message: obj.message, status: true }));
  })

  return (
    <>
      <SocketConnection.Provider value={socket}>
          <AppBarContainer/>
          {isAdminError || isRefreshed ? <AdminClosed /> : <HomeContainer />}
      </SocketConnection.Provider>
    </>
  );
}

export default React.memo(App);
