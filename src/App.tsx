import React from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { Store } from 'react-notifications-component';
import { set_isConnected } from './store';
import HomeBody from "./components/HomeBody";
import "./App.css";


const URL = import.meta.env.VITE_WEBSOCKET_URL;

const socket = io(URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000
});

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    socket.on('connect', () => {
      dispatch(set_isConnected({
        status: 200,
        message: 'connected'
      }));
    });

    socket.on('connect_error', () => {
      dispatch(set_isConnected({
        status: 500,
        message: "disconnected"
      }));
    });

    socket.on('disconnect', () => {
      dispatch(set_isConnected({
        status: 500,
        message: "disconnected"
      }));
    });

    socket.io.on("reconnect_attempt", () => {
      Store.addNotification({
        title: "Reconnect",
        message: "trying to reconnect...",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
    });

    socket.io.on("reconnect_failed", () => {
      console.log('reconnected failed')
    });

    socket.io.on('reconnect', () => {
      Store.addNotification({
        title: "Connected",
        message: "connection is established",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
    });

    socket.io.on("reconnect_failed", () => {
      Store.removeAllNotifications();
      
      Store.addNotification({
        title: "Failed",
        message: "Reconnection failed, please refresh",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true
        }
      });
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return <HomeBody />
}

export default React.memo(App);
