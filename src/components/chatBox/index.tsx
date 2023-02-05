import * as React from 'react';
import { WebSocketHook, JsonValue } from 'react-use-websocket/dist/lib/types';

interface IProps {
    ws: WebSocketHook<JsonValue | null, MessageEvent<any> | null>;
}

function ChatBox(props: IProps) {
    const { ws } = props;
    const [state, setState] = React.useState<any>(null);

    React.useEffect(() => {
        // .........
        // ws.sendMessage('Hi');
    }, [state]);



    return (
        <>
            <small>Let's chat</small>
        </>
    );
}

export default ChatBox;
