import LinkedList, { IValues } from "./LinkedList";

const emptyLinkedList = new LinkedList();

class UserModal {
    public userName: string;
    public userId: string;
    public accessId: string;
    public connected: string[];
    public messages: LinkedList;

    constructor (name: string, userId: string, accessId: string, message?: LinkedList) {
        this.userName = name;
        this.userId = userId;
        this.accessId = accessId;
        this.connected = [];
        this.messages = message ? message : emptyLinkedList;
    }

    pushMessage(val: IValues) {
        this.messages.push(val);
    }
}

export default UserModal;