import { IconType } from "react-icons";

export type Msg_Type = 'typing' | 'message' | 'started_chat' | 'user_joined' | 'user_removed' | 'removed_typing';

// Socket actions. 
export const CREATE_USER = "CREATE_USER";
export const FAILED_RESPONSE = "FAILED_RESPONSE";
export const SEND_RESPONSE_CREATED_USER = "SEND_RESPONSE_CREATED_USER";
export const MESSAGES = "get_messages";
export const SEND_MESSAGES = 'send_messages';
export type SUCCESS_RESPONSE_USER_CREATE = {
  statusCode: number;
  body: {
    _id: string;
    username: string;
    email: string;
    is_root: boolean;
    connection_id: string;
    socket_id: string;
  }
}

export type FAILED_RESPONSE_USER_CREATE = {
  statusCode: 404 | 500,
  message: string
}

export type ForElementType = "existed_element" | "new_element" | ""; 
export interface LoginContainerState {
  openedBar: boolean;
  forElement: "existed_element" | "new_element" | "";
}

export interface IDialogBarProps {
  setOpenedBar: (types: ForElementType) => void;
}

export type IListDialogBarNames =
  "existed_element_fullName" |
  "existed_element_email" |
  "existed_element_connectionId" |
  "new_chat_name" |
  "new_chat_email";
export interface IItemsListDialogBarObject {
  placeholder: string;
  fieldType: string;
  label: string;
  id: string;
  width: string;
  key: number;
  value: string;
  name: IListDialogBarNames;
}

export interface IItemsListDialogBarList {
  existed_element: {
    title: string;
    subtitle: string;
    lists: IItemsListDialogBarObject[]
  },
  new_element: {
    title: string;
    subtitle: string;
    lists: IItemsListDialogBarObject[]
  }
}

export interface SET_UP_USER {
  email: string;
  is_root: boolean;
  username: string;
  connection_id: string | null;
}

export type OptionListsType = {
  id: number;
  icon: IconType;
  size: number,
  color: string;
}
export interface LoginBodyStateType {
  activeOptionId: number;
  optionLists: OptionListsType[];
}

export type RESPONSE_CHAT_BODY = {
  username: string;
  message: string;
  connection_id: string;
  is_root: boolean;
  socket_id: string;
}

export type RESPONSE_CHAT = {
  _id: string;
  connection_id: string;
  group_name: string;
  messages: RESPONSE_CHAT_BODY[];
}

export interface IChatGroupProps {
  data: RESPONSE_CHAT_BODY[];
  groupName: string;
  time: string;
}