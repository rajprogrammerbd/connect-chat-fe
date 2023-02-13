import LinkedList, { IValues } from "../Data/LinkedList";

function map(list: LinkedList): IValues[] {
    const arr = [];
    let current = list.head;

    while (current) {
        arr.push(current.value);
        current = current.next;
    }

    return arr;
}

export default map;