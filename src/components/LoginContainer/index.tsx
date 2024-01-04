import React from "react";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import textFinder from "../assets/static-texts";
import { ForElementType, LoginContainerState } from "../../Types";
import { AnimatePresence, motion } from "framer-motion"


// Loading lazy components
const DialogBar = React.lazy(() => import("../DialogBar"));

// Lists of useContexts
export const ForElementNamed = React.createContext<ForElementType>("");

function LoginContainer() {
    const [state, setState] = React.useState<LoginContainerState>({ openedBar: false, forElement: "" });
    const { isConnected } = useSelector((root: RootState) => root.user);

    const isConnect = (): boolean => {
        if (!isConnected || isConnected.status === 500) {
            return false;
        }

        return true;
    }

    const setOpenedBar = React.useCallback((forElement: ForElementType): void => {
        setState((prev: LoginContainerState) => ({
            ...prev,
            openedBar: !prev.openedBar,
            forElement: (forElement === "") ? prev.forElement : forElement
        }));
    }, []);
    
    return (
        <React.Suspense fallback={<h4>Loading...</h4>}>
            <ForElementNamed.Provider value={state.forElement}>
                <motion.div
                    className="w-full items-center flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0 } }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex flex-col items-center justify-center w-1/2">
                        {!isConnect() ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: 435 }} /> : (
                            <h4 className="font-black text-2xl">{textFinder('longDescriptionFormText')}</h4>
                        )}
                        
                        <div className="flex flex-row space-x-7 mt-5">
                            {!isConnect() ? <Skeleton variant="rounded" sx={{ width: '114px', height: '36px' }} /> : (
                                <Button variant="contained" onClick={() => setOpenedBar("existed_element")}>
                                    {textFinder("existedIdButtonText")}
                                </Button>
                            )}

                            {!isConnect() ? <Skeleton variant="rounded" sx={{ width: '159px', height: '36px' }} /> : (
                                <Button variant="contained" onClick={() => setOpenedBar("new_element")}>
                                    {textFinder("startNewChatButtonText")}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* DialogBox Implementation */}
                <AnimatePresence>
                    {state.openedBar && <DialogBar setOpenedBar={setOpenedBar} />}
                </AnimatePresence>
            </ForElementNamed.Provider>
        </React.Suspense>
    );
}

export default React.memo(LoginContainer);
