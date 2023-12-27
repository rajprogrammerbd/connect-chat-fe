import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function LoginContainer() {
    const { isConnected } = useSelector((root: RootState) => root.user);

    const isConnect = (): boolean => {
        if (!isConnected || isConnected.status === 500) {
            return false;
        }

        return true;
    }
    
    return (
        <>
            <div className="w-full items-center flex flex-col">
                <div className="flex flex-col items-center justify-center w-1/2">
                    {!isConnect() ? <Skeleton variant="text" sx={{ fontSize: '1rem', width: 435 }} /> : (
                        <h4 className="font-black text-2xl">Connect with disposable chat system</h4>
                    )}
                    
                    <div className="flex flex-row space-x-7 mt-5">
                        {!isConnect() ? <Skeleton variant="rounded" sx={{ width: '114px', height: '36px' }} /> : (
                            <Button variant="contained">
                                Existed ID
                            </Button>
                        )}

                        {!isConnect() ? <Skeleton variant="rounded" sx={{ width: '159px', height: '36px' }} /> : (
                            <Button variant="contained">
                                Start New Chat
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(LoginContainer);
