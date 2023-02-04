import HashMap from "../structures/hashMap";

interface IObjects {
    [key: string]: string
}

const textObjs: IObjects = {
    appName: 'ConnectChat',
    longDescriptionFormText: 'Way to connect and disposable chat',
    questionAboutExistedID: 'Do you have existed chat ID?',
    existedIdButtonText: 'Existed ID'
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