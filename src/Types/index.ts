import LinkedList from "../Data/LinkedList";

export type IUsersName = {
    name: string;
    userId: string;
}

export interface INewConnectionResponse {
    connection: boolean;
    message: string;
    userId: string;
    accessId: string;
    name: string;
    userIds: IUsersName[];
    messages: LinkedList;
}

export interface IFailedResponse {
    connection: boolean;
    message: string;
}