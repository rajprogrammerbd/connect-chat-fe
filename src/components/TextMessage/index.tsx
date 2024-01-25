import React from "react";
import { ITextMessage, SIDE } from "../../Types";
import { styled } from "styled-components";

function sides(s: SIDE): string {
    if (s === "middle") {
        return "center";
    } else if (s === "left") {
        return "flex-start";
    } else {
        return "flex-end";
    }
}

const MessageContainer = styled.div<{ $side: SIDE }>`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: ${prop => sides(prop.$side)}
`;

const MessageItemMiddle = styled.p`
    font-family: inherit;
    font-size: 16px;
    color: #8d8d8d;
    font-style: italic;
    font-weight: 400;
`;

// Add styles to text messages later on after integrating the send message system.
const MessageItemContainer = styled.div``;

const MessageItemSideBars = styled.p``;

function TextMessage(props: ITextMessage) {
    const { side, text } = props;

    return (
        <>
            <MessageContainer $side={side} className="my-5">
                <>
                    {(side === "middle") ? (
                        <MessageItemMiddle>{text}</MessageItemMiddle>
                    ) : (
                        <MessageItemContainer>
                            <MessageItemSideBars>{text}</MessageItemSideBars>
                        </MessageItemContainer>
                    )}
                </>
            </MessageContainer>
        </>
    );
}

export default React.memo(TextMessage);
