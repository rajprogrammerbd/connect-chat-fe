import React from "react";
import { ForElementNamed } from "../LoginContainer";
import { IItemsListDialogBarList, IItemsListDialogBarObject, IListDialogBarNames } from "../../Types";
import textFinder from "../assets/static-texts";
import { useAnimate, motion } from "framer-motion";
import { SetUpUser } from "../../App";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface IProps {
    width: "same" | "alternate";
}

function DialogBarLists(props: IProps) {
    const forElement = React.useContext(ForElementNamed);
    const setUpUser = React.useContext(SetUpUser);
    const { error } = useSelector((state: RootState) => state.user);
    const [scope, animate] = useAnimate();
    const [state, setState] = React.useState<IItemsListDialogBarList>(() => {
        return {
            existed_element: {
                title: textFinder("accessConnectionId"),
                subtitle: textFinder("provideConnectionId"),
                lists: [
                    {
                        key: 1,
                        fieldType: 'text',
                        placeholder: textFinder("enterYourName"),
                        label: "full name:",
                        id: "nameText",
                        width: "w-80",
                        value: "",
                        name: "existed_element_fullName"
                    },
                    {
                        key: 2,
                        fieldType: "email",
                        placeholder: textFinder("enterYourEmail"),
                        label: "email address:",
                        id: "emailInput",
                        width: "w-80",
                        value: "",
                        name: "existed_element_email"
                    },
                    {
                        key: 3,
                        fieldType: "text",
                        placeholder: textFinder("connectionId"),
                        label: "Connection ID:",
                        id: "connectionIdInput",
                        width: "w-80",
                        value: "",
                        name: "existed_element_connectionId"
                    }
                ]
            },
            new_element: {
                title: textFinder("startNewChatTitle"),
                subtitle: textFinder("startNewChatSubTitle"),
                lists: [
                    {
                        key: 1,
                        fieldType: 'text',
                        placeholder: textFinder("enterYourName"),
                        label: "full name:",
                        id: "newChatNameInput",
                        width: "w-80",
                        value: "",
                        name: "new_chat_name"
                    },
                    {
                        key: 2,
                        fieldType: "email",
                        placeholder: textFinder("enterYourEmail"),
                        label: "Email address:",
                        id: "newChatEmailInput",
                        width: (props.width === "same") ? "w-80" : "w-96",
                        value: "",
                        name: "new_chat_email"
                    }
                ]
            }
        };
    });

    React.useEffect(() => {
        animate("li", { opacity: 1 }, { duration: 1 });
    }, []);

    const getTitle = React.useCallback((): string => {
        if (forElement === "existed_element") {
            return state.existed_element.title;
        }

        return state.new_element.title;
    }, []);

    const getSubtitle = React.useCallback((): string => {
        if (forElement === "existed_element") {
            return state.existed_element.subtitle;
        }

        return state.new_element.subtitle;
    }, []);

    const getList = React.useCallback((): IItemsListDialogBarObject[] => {
        if (forElement === "existed_element") {
            return state.existed_element.lists;
        }

        return state.new_element.lists;
    }, []);

    const updateForm = React.useCallback((text: string, name: IListDialogBarNames) => {
        if (name === 'new_chat_name') {
            setState((prev: IItemsListDialogBarList) => {
                const lists = prev.new_element.lists;
                lists[0].value = text;

                return {
                    ...prev,
                    new_element: {
                        ...prev.new_element,
                        lists
                    }
                };
            })
        } else if (name === 'new_chat_email') {
            setState((prev: IItemsListDialogBarList) => {
                const lists = prev.new_element.lists;
                lists[1].value = text;

                return {
                    ...prev,
                    new_element: {
                        ...prev.new_element,
                        lists
                    }
                };
            });
        } else if (name === "existed_element_fullName") {
            setState((prev: IItemsListDialogBarList) => {
                const lists = prev.existed_element.lists;
                lists[0].value = text;

                return {
                    ...prev,
                    existed_element: {
                        ...prev.existed_element,
                        lists
                    }
                }
            });
        } else if (name === "existed_element_email") {
            setState((prev: IItemsListDialogBarList) => {
                const lists = prev.existed_element.lists;
                lists[1].value = text;

                return {
                    ...prev,
                    existed_element: {
                        ...prev.existed_element,
                        lists
                    }
                }
            });
        } else if (name === "existed_element_connectionId") {
            setState((prev: IItemsListDialogBarList) => {
                const lists = prev.existed_element.lists;
                lists[2].value = text;

                return {
                    ...prev,
                    existed_element: {
                        ...prev.existed_element,
                        lists
                    }
                }
            });
        }
    }, []);

    const sendUserConnection = React.useCallback(() => {
        if (forElement === "new_element") {
            // new user.
            const { lists } = state.new_element;

            setUpUser({ username: lists[0].value, email: lists[1].value, connection_id: null, is_root: true });
        } else {
            const { lists } = state.existed_element;

            setUpUser({ username: lists[0].value, email: lists[1].value, connection_id: lists[2].value, is_root: false })
        }
    }, []);
    console.log('error ', error);
    return (
        <>
            <div>
                <motion.p style={{ textShadow: "2px 3px 7px #00000070" }} className="text-xl uppercase text-white font-black">{getTitle()}</motion.p>
            </div>

            <div className="mt-2">
                <p className="text-sm" style={{ color: "#e09696", textShadow: "0 0 1px black" }}>{getSubtitle()}</p>
            </div>

            <ul className="list-none mt-11" ref={scope}>
                {getList().map((list: IItemsListDialogBarObject) => (
                    <li className="opacity-0 py-4" key={list.key}>
                        <div className="flex flex-col items-end">
                            <motion.label htmlFor={`#${list.id}`} style={{ textShadow: "rgb(157 91 79) 0px 0px 3px", letterSpacing: 5 }} className="font-bold text-white text-sm pb-2 uppercase">{list.label}</motion.label>
                            <input type={list.fieldType} value={list.value} onChange={e => updateForm(e.target.value, list.name)} id={list.id} style={{ border: "0.5px solid rgb(220 220 220)", borderRadius: "11px" }} className={`${list.width} h-11 outline-none placeholder:text-gray-400 p-5`} placeholder={list.placeholder} />
                        </div>
                    </li>
                ))}

                <div className="flex flex-col mt-3 items-end">
                    {(error !== null && error.message) ? <p className="text-red-500">{error.message}</p> : <p></p>}
                </div>

                <div className="flex flex-row space-x-4 justify-end mt-3 items-end">
                    <Button onClick={sendUserConnection} variant="contained">{textFinder("sendUserLoginSubmitButton")}</Button>
                </div>
            </ul>
        </>
    );
}

export default React.memo(DialogBarLists);
