import React from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { Store } from 'react-notifications-component';
import textFinder from './components/assets/static-texts';
import { setUp_selectedChatData, setUp_user, set_error, set_isConnected } from './store';
import HomeBody from "./components/HomeBody";
import { CREATE_USER, FAILED_RESPONSE, FAILED_RESPONSE_USER_CREATE, MESSAGES, RECONNECT, RESPONSE_CHAT, SEND_MESSAGES, SEND_RESPONSE_CREATED_USER, SEND_UPDATE_GROUP_NAME, SEND_USER_MESSAGE, SET_UP_USER, SUCCESS_RESPONSE_USER_CREATE, UPDATE_GROUP_NAME, UPDATE_MESSAGE_AND_GROUP_NAME } from './Types';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { AnimatePresence } from 'framer-motion';
import { add_message } from './store/messages';
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
export const UpdateGroupNameFunc = React.createContext((groupName: string) => {});
export const SendMessage = React.createContext((connection_id: string, is_root: boolean, username: string, message: string, socket_id: string) => {});

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  React.useEffect(() => {
    const data = user?.body;

    if (data) {
      const { socket_id, email } = data;

      socket.emit(RECONNECT, socket_id, email);
    }
  }, []);

  React.useEffect(() => {
    socket.on('connect', () => {
      dispatch(set_isConnected({
        status: 200,
        message: 'connected'
      }));
    });

    socket.on(SEND_UPDATE_GROUP_NAME, (body: UPDATE_MESSAGE_AND_GROUP_NAME) => {
      const { connection_id, data } = body;

      dispatch(setUp_selectedChatData({ connection_id, groupName: data.group_name }));
      dispatch(add_message({ messages: data.messages, connection_id, group_name: data.group_name }));
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

    socket.on(SEND_MESSAGES, (body: RESPONSE_CHAT) => {
      dispatch(add_message({ messages: body.messages, connection_id: body.connection_id, group_name: body.group_name }));

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

  const updateGroupName = (groupName: string): void => {
    if (user?.body) {
      const body = user.body;

      socket.emit(UPDATE_GROUP_NAME, { groupName, connection_id: body.connection_id, email: body.email });
    }
  }

  const sendMessage = (connection_id: string, is_root: boolean, username: string, message: string, socket_id: string) => {
    socket.emit(SEND_USER_MESSAGE, { connection_id, is_root, username, message, socket_id });
  }

  return (
    <SetUpUser.Provider value={setUpUser}>
        <AnimatePresence mode="wait">
          {!user ? (
            <div className="w-full lg:container h-full mt-12 scroll-smooth overflow-x-hidden overflow-y-auto flex items-center justify-center flex-col no-scrollbar">
              <HomeBody />
            </div>
            ) : (
              <React.Suspense fallback={<p>Loading</p>}>
                <UpdateGroupNameFunc.Provider value={updateGroupName}>
                  <SendMessage.Provider value={sendMessage}>
                    <LoginBody />
                  </SendMessage.Provider>

                </UpdateGroupNameFunc.Provider>
              </React.Suspense>
            )}
        </AnimatePresence>
    </SetUpUser.Provider>
  )
}

export default React.memo(App);
