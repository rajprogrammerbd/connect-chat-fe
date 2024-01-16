import React from 'react';
import { MdChatBubble } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { LoginBodyStateType, OptionListsType } from '../../Types';

export default function LoginBodyOptionsBar() {
    const [state] = React.useState<LoginBodyStateType>(() => {
        return {
            activeOptionId: 0,
            optionLists: [
                {
                    id: 0,
                    icon: MdChatBubble,
                    size: 20,
                    color: "black",
                    active: true
                }
            ]
        }
    });

    return (
        <div className="border-r-2 border-gray-100">
            <div className="mt-5 ml-2">
                <div className="profile-pictures mb-10">
                    <FaRegUserCircle size={30} color='#1976d2' />
                </div>
                <div className="profile-options">
                    {state.optionLists.map((list: OptionListsType) => <div style={{ borderRight: (state.activeOptionId === list.id) ? "1px solid #1976d2" : "none" }} key={list.id} className="option-items"><list.icon key={list.id} size={list.size} color={(state.activeOptionId === list.id) ? "#1976d2" : list.color} /></div>)}
                </div>
            </div>
        </div>
    );
}