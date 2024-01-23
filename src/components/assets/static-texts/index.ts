import HashMap from "../structures/hashMap";

interface IObjects {
    [key: string]: string
}

const textObjs: IObjects = {
    appName: 'ConnectChat',
    longDescriptionFormText: 'Connect with disposable chat system',
    existedIdButtonText: 'Existed ID',
    startNewChatButtonText: 'Start new Chat',
    tryingReconnect: "trying to reconnect...",
    disconnected: "disconnected",
    connectionEstablished: "connection is established",
    reconnectionFailed: "Reconnection failed, please refresh",
    startNewChatTitle: "Start a new chat",
    startNewChatSubTitle: "Provide all required field (*) details",
    enterYourName: "Enter your name",
    enterYourEmail: "Enter your email address",
    accessConnectionId: "Access the chat world!",
    provideConnectionId: "Provide your connection Id",
    connectionId: "Enter the connection Id",
    sendUserLoginSubmitButton: "Access",
    resetLogin: "Reset",
    notMessageToShow: "Not messages to show",
    noChatSelectedMessage: "Not chat selected",
    MessageDetails: "Message Detail"
};

const textHash = new HashMap(1000);

for (const key in textObjs) {
    textHash.set(key, textObjs[key]);
}

function textFinder(key: string): string {
    const find = textHash.get(key);

    if (find) return find;

    return 'no found';
}


export default textFinder;
