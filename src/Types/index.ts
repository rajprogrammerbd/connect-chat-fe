import LinkedList from "../Data/LinkedList";

export type IUsersName = {
    name: string;
    userId: string;
    connectedAccessId: string;
}

export interface INewConnectionResponse {
    connection: boolean;
    message: string;
    userId: string;
    accessId: string;
    connectedAccessId: string;
    name: string;
    userIds: IUsersName[];
    messages: LinkedList;
}

export interface IFailedResponse {
    connection: boolean;
    message: string;
}