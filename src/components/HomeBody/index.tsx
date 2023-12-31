import React, { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const LoginContainer = React.lazy(() => import('../LoginContainer'));

function HomeBody() {    
    return (
        <Suspense fallback={<CircularProgress />}>
            <div className="container h-full mt-12 scroll-smooth overflow-x-hidden overflow-y-auto flex items-center justify-center flex-col no-scrollbar">
                <LoginContainer />
            </div>
        </Suspense>
    );
}

export default React.memo(HomeBody);
