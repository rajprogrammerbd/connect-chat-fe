export type Msg_Type = 'typing' | 'message' | 'started_chat' | 'user_joined' | 'user_removed' | 'removed_typing';

  export enum Msg_Types {
    msg = 'message',
    join = 'user_joined',
    removed = 'user_removed',
    typing = 'typing',
    rv_typing = 'removed_typing',
    started_chat = 'started_chat'
  }

export type IUser = {
    userId: string
    chatId: string
    userName: string
    isAdmin: boolean
}

export type IMsg = {
    type: Msg_Type
    chatId: string
    userName: string
    userId: string;
    message: string
    timestamp: Date;
  }

export type IReciveUser = {
    connection: boolean;
    chatId: string;
    message: string;
    messages: IMsg[];
    name: string;
    userId: string;
    connectedUsersList: IUser[];
};

export type ReceivedMessagePayload = {
    chatId: string;
    connectedUsersList: IUser[];
    userId: string;
    name: string;
    messages: IMsg[];
    isAdmin?: boolean;
}

export type ISendMsgType = {
  chatId: string;
  userId: string;
  msg: string;
}
