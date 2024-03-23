import React, { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const LoginContainer = React.lazy(() => import('../LoginContainer'));

function HomeBody() {    
    return (
        <Suspense fallback={<CircularProgress />}>
            <LoginContainer />
        </Suspense>
    );
}

export default React.memo(HomeBody);
