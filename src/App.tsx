import React from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { Store } from 'react-notifications-component';
import textFinder from './components/assets/static-texts';
import { setUp_user, set_error, set_isConnected } from './store';
import HomeBody from "./components/HomeBody";
import { CREATE_USER, FAILED_RESPONSE, FAILED_RESPONSE_USER_CREATE, SEND_RESPONSE_CREATED_USER, SET_UP_USER, SUCCESS_RESPONSE_USER_CREATE } from './Types';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { AnimatePresence } from 'framer-motion';
import "./App.css";

// import lazy components
const LoginBody = React.lazy(() => import('./components/LoginBody'));

const URL = import.meta.env.VITE_WEBSOCKET_URL;

const socket = io(URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000
});

// React context
export const SetUpUser = React.createContext<(prop: SET_UP_USER) => void>(() => {});

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  React.useEffect(() => {
    socket.on('connect', () => {
      dispatch(set_isConnected({
        status: 200,
        message: 'connected'
      }));
    });

    socket.on(SEND_RESPONSE_CREATED_USER, (response: SUCCESS_RESPONSE_USER_CREATE) => {

      dispatch(setUp_user({ ...response }));
    });

    socket.on(FAILED_RESPONSE, (response: FAILED_RESPONSE_USER_CREATE) => {
      dispatch(set_error({ ...response }));
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
        message: textFinder("textObjs"),
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

    socket.io.on('reconnect', () => {
      Store.addNotification({
        title: "Connected",
        message: textFinder("connectionEstablished"),
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
        message: textFinder("reconnectionFailed"),
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

  const setUpUser = React.useCallback(({ email, is_root, username, connection_id }: SET_UP_USER) => {
    socket.emit(CREATE_USER, { email, is_root, username, connection_id });
  }, []);
  console.log(user);
  return (
    <SetUpUser.Provider value={setUpUser}>
      <div className="container h-full mt-12 scroll-smooth overflow-x-hidden overflow-y-auto flex items-center justify-center flex-col no-scrollbar">
        <AnimatePresence mode="wait">
          {!user ? (
              <HomeBody />
            ) : (
              <React.Suspense fallback={<p>Loading</p>}>
                <LoginBody />
              </React.Suspense>
            )}
        </AnimatePresence>
      </div>
    </SetUpUser.Provider>
  )
}

export default React.memo(App);
